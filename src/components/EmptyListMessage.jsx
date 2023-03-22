import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 650,
    padding: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: theme.palette.grey[500]
  }
}))

export default function EmptyListMessage({ text }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="body2" className={classes.text}>
        {text}
      </Typography>
    </div>
  )
}
