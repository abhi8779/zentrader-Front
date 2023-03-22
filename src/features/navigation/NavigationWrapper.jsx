import { useMediaQuery } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React, { useContext, useState } from 'react'
import NavigationContext from './contexts/NavigationContext'
import LgScreenDrawer from './drawers/LgScreenDrawer'
import SmScreenDrawer from './drawers/SmScreenDrawer'

import Navbar from './navbars/Navbar'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    background: '#efefef'
    // overflow: 'auto'
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0)
  }
}))

function NavigationWrapper({ children }) {
  const theme = useTheme()
  const classes = useStyles()
  const { filteredMenu } = useContext(NavigationContext)
  const [open, setOpen] = useState(false)
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar
        open={open}
        filteredMenu={filteredMenu}
        handleDrawerOpen={handleDrawerOpen}
      />
      {smallScreen ? (
        <SmScreenDrawer
          handleDrawerClose={handleDrawerClose}
          filteredMenu={filteredMenu}
          handleDrawerOpen={handleDrawerOpen}
          open={open}
        />
      ) : (
        <LgScreenDrawer
          handleDrawerClose={handleDrawerClose}
          filteredMenu={filteredMenu}
          open={open}
        />
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default NavigationWrapper
