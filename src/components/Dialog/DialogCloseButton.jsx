import { IconButton, makeStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 8,
    right: 16
  }
}))

const DialogCloseButton = ({ onClick }) => {
  const classes = useStyles()
  return (
    <IconButton onClick={onClick} className={classes.root}>
      <CloseIcon />
    </IconButton>
  )
}

export default DialogCloseButton
