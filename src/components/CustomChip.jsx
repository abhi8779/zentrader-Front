import { Chip, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  orderChip: {
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '4px',
    padding: '2px 5px',
    fontSize: '10px',
    textTransform: 'uppercase',
    height: 'auto',
    '& .MuiChip-label': {
      padding: '0'
    }
  }
}))

const CustomChip = ({
  label,
  color = 'white',
  bgColor = 'white',
  ...props
}) => {
  const classes = useStyles()
  return (
    <Chip
      label={label}
      className={classes.orderChip}
      style={{
        backgroundColor: bgColor,
        ...props?.style
      }}
    />
  )
}

export default CustomChip
