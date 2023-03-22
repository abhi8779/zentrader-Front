import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import AddIcon from '@material-ui/icons/Add'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveIcon from '@material-ui/icons/Remove'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  addInstrumentToAthPortfolio,
  deletePortfolioItem
} from '../../athPortfolio/slices/athPortfolioSlice'

const AddToPortfolioNameButton = ({ resultId }) => {
  const theme = useTheme()
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
    toast.success('Instrument added to portfolio')
    setLoading(true)
  }

  const removeInstrument = () => {
    dispatch(deletePortfolioItem({ resultId }))
    toast.success('Instrument removed from portfolio')
    setLoading(true)
  }

  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <>
      {loading ? (
        <Box p={1.5} display="inline-block">
          <CircularProgress color="primary" size={16} />
        </Box>
      ) : (
        <>
          {!smallScreen ? (
            <>
              {isInstrumentInPortfolio ? (
                <Button
                  startIcon={<RemoveIcon />}
                  variant="text"
                  size="small"
                  component="label"
                  style={{ color: red[500] }}
                  onClick={removeInstrument}>
                  Remove From portfolio
                </Button>
              ) : (
                <Button
                  startIcon={<AddIcon />}
                  variant="text"
                  size="small"
                  color="primary"
                  component="label"
                  onClick={addInstrument}>
                  Add to portfolio
                </Button>
              )}
            </>
          ) : (
            <>
              {isInstrumentInPortfolio ? (
                <IconButton onClick={removeInstrument} aria-label="delete">
                  <RemoveCircleIcon style={{ color: red[500] }} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={addInstrument}
                  color="primary"
                  aria-label="delete">
                  <AddCircleIcon />
                </IconButton>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default AddToPortfolioNameButton
