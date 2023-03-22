import React from 'react'
import { useDispatch } from 'react-redux'
import { getPositions } from './positionSlice'
import PositionsTable from './PositionsTable'
import PositionToolbar from './PositionToolbar'

const PositionsContainer = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getPositions())
  })

  return (
    <>
      <PositionToolbar />
      <PositionsTable />
    </>
  )
}

export default PositionsContainer
