import theme from '@/theme'
import { Box, makeStyles, useMediaQuery } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 3
  },
  message: {
    width: '100%'
  },
  icon: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const AlertBox = ({ text, severity, actionComponent, ...props }) => {
  const classes = useStyles()
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Alert
      severity={severity}
      classes={{
        root: classes.root,
        message: classes.message,
        icon: classes.icon
      }}
      {...props}>
      <Box
        display={'flex'}
        gridColumnGap={theme.spacing(2)}
        justifyContent="space-between"
        flexDirection={smallScreen ? 'column' : 'row'}
        alignItems={'center'}>
        <Box>{text}</Box>
        <Box
          width={'fit-content'}
          style={{
            marginTop: smallScreen ? theme.spacing(1) : 0,
            marginRight: smallScreen ? 'auto' : ''
          }}>
          {actionComponent}
        </Box>
      </Box>
    </Alert>
  )
}

export default AlertBox
