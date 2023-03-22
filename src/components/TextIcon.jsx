import { Box, ListItemIcon, makeStyles, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  textIconWrap: {
    backgroundColor: theme.palette.grey[500],
    width: 28,
    height: 28,
    padding: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  textIconWrapActive: {
    backgroundColor: theme.palette.primary.main
  },
  textIconText: {
    fontSize: '12px',
    fontWeight: 700,
    color: theme.palette.grey[100]
  }
}))

const TextIcon = ({ text, icon, isActive, ...props }) => {
  const classes = useStyles()
  return (
    <Box
      {...props}
      className={clsx(classes.textIconWrap, {
        [classes.textIconWrapActive]: isActive
      })}>
      {icon && (
        <ListItemIcon
          style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
          {icon}
        </ListItemIcon>
      )}
      {text && <Typography className={classes.textIconText}>{text}</Typography>}
    </Box>
  )
}

export default TextIcon
