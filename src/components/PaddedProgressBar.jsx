import {
  Box,
  CircularProgress,
  makeStyles,
  Typography
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 650,
    padding: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

function PaddedProgressBar({ size = 16, color = 'primary', text, ...props }) {
  const classes = useStyles()
  return (
    <Box className={classes.root} {...props}>
      <CircularProgress size={size} color={color} />
      {text && (
        <Box ml={1} color={color}>
          <Typography variant="caption" color="inherit">
            {text}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default PaddedProgressBar
