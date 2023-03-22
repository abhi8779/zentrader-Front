import { Box, CircularProgress, IconButton, Tooltip } from '@material-ui/core'
import { blue, red } from '@material-ui/core/colors'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addInstrumentToAthPortfolio,
  deletePortfolioItem
} from '../../athPortfolio/slices/athPortfolioSlice'

const AddToPortfolioButton = ({ resultId }) => {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const portfolioInstruments = useSelector(
    (s) => s.ath.athPortfolio?.data.instruments
  )

  const isInstrumentInPortfolio = Boolean(
    portfolioInstruments.filter((x) => x === resultId).length
  )

  useEffect(() => {
    setLoading(false)
  }, [portfolioInstruments])

  const addInstrument = () => {
    dispatch(addInstrumentToAthPortfolio({ resultId }))
    setLoading(true)
  }

  const removeInstrument = () => {
    dispatch(deletePortfolioItem({ resultId }))
    setLoading(true)
  }

  return (
    <>
      {loading ? (
        <Box p={1.5} display="inline-block">
          <CircularProgress color="primary" size={16} />
        </Box>
      ) : (
        <>
          {isInstrumentInPortfolio ? (
            <Tooltip title="Remove instrument from portfolio">
              <IconButton
                size="small"
                onClick={removeInstrument}
                style={{ color: red[300] }}>
                <RemoveCircleIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Add instrument to portfolio">
              <IconButton
                size="small"
                onClick={addInstrument}
                style={{ color: blue[300] }}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
    </>
  )
}

export default AddToPortfolioButton
