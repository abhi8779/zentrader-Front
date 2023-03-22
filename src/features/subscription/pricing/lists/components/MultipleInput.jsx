import { Button, ButtonGroup, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  activeIntervalMonth: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }
}))

const MultipleInput = ({ onChange, months }) => {
  const classes = useStyles()

  const [selectedMonth, setSelectedMonth] = useState(Math.max(...months))

  useEffect(() => {
    onChange && onChange(selectedMonth)
  }, [selectedMonth])
  return (
    <ButtonGroup style={{ color: 'black' }}>
      {months.map((period) => {
        return (
          <Button
            key={period}
            className={
              selectedMonth === period ? classes.activeIntervalMonth : ''
            }
            onClick={(e) => {
              setSelectedMonth(period)
            }}>
            {period} month
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

export default MultipleInput
