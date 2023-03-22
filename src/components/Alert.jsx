import { Box, lighten } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: lighten(theme.palette.success.main, 0.9)
  }
}))

const Alert = ({ type = 'success', bgcolor = 'success.main', children }) => {
  const classes = useStyles()
  return (
    <Box p={2} borderRadius={2} bgcolor={bgcolor} className={classes.root}>
      {children}
    </Box>
  )
}

export default Alert
