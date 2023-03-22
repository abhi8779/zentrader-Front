import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddToPortfolioButton from '../../athResults/buttons/AddToPortfolioButton'
import AthResultsTable from '../../AthResutsTable'
import { getAthPortfolioData } from '../slices/athPortfolioSlice'

const AthPortfolio = () => {
  const dispatch = useDispatch()
  const data = useSelector((s) => s.ath.athPortfolio.data.results)
  const counts = useSelector((s) => s.ath.athPortfolio.counts)
  const loading = useSelector((s) => s.ath.athPortfolio.isLoading)
  const onFilterChange = (filters) => {
    dispatch(getAthPortfolioData({ filters }))
  }

  return (
    <>
      <AthResultsTable
        data={data}
        loading={loading}
        counts={counts}
        onFilterChange={onFilterChange}
        extraColumns={[
          {
            Header: ' ',
            accessor: (rowData) => {
              return rowData.stop_loss
            },
            disableFilters: true,
            Cell: (row) => {
              return (
                <>
                  <AddToPortfolioButton
                    resultId={row.row.original.id}
                    version={row.row.original.version}
                  />
                </>
              )
            }
          }
        ]}
      />
    </>
  )
}

export default AthPortfolio
