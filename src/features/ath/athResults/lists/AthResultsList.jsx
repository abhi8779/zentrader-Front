import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AthResutsTable from '../../AthResutsTable'
import AddToPortfolioButton from '../buttons/AddToPortfolioButton'
import { getAthResults } from '../slices/athListSlice'
const AthResultsList = () => {
  const dispatch = useDispatch()
  const data = useSelector((s) => s.ath.athList.data)
  const counts = useSelector((s) => s.ath.athList.counts)
  const loading = useSelector((s) => s.ath.athList.isLoading)
  const onFilterChange = useCallback((filters) => {
    dispatch(getAthResults({ filters }))
  }, [])

  return (
    <>
      <AthResutsTable
        data={data}
        counts={counts}
        loading={loading}
        onFilterChange={onFilterChange}
        extraColumns={[
          {
            Header: ' ',
            disableFilters: true,
            Cell: (row) => {
              return (
                <>
                  <AddToPortfolioButton resultId={row.row.original.id} />
                </>
              )
            }
          }
        ]}
      />
    </>
  )
}

export default AthResultsList
