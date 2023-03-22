import { createOrdersFromCart } from '@/pages/OptionSell/Cart/cartSlice'
import { Button, lighten, makeStyles, Toolbar } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import StrikesMeasureFilters from './components/StrikeMeasureFilters'
import StrikeTable from './components/StrikesMeasureTable'

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    padding: theme.spacing(2),
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
    display: 'flex',
    alignItems: 'center'
  }
}))

const StrikeMeasuresContainer = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <>
      <Toolbar className={classes.filterContainer}>
        <StrikesMeasureFilters />
        <Button
          onClick={() => {
            dispatch(createOrdersFromCart())
          }}
          variant="contained"
          color="primary"
          size="small">
          Add to Orders
        </Button>
      </Toolbar>
      <StrikeTable />
    </>
  )
}

export default StrikeMeasuresContainer
