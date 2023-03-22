import logorap from '@/assets/images/ap-logo-black.png'
import logorytt from '@/assets/images/rytt-logo.png'
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useMediaQuery
} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import TextIcon from '../../../components/TextIcon'
import BRANDING from '../../../config'
import { AccountMenuButton } from '../buttons/AccountMenuButton'
import LoginButton from '../buttons/LoginButton'
import NavigationContext from '../contexts/NavigationContext'
const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 35,
    objectFit: 'contain'
  },
  smallLogo: {
    height: 25
  },

  // Menu
  accountMenu: {
    '& .MuiPaper-root': {
      minWidth: 200
    }
  },

  appBar: {
    background: 'white',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    // marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  hide: {
    display: 'none'
  }
}))

const NavBar = ({ handleDrawerOpen, open }) => {
  const theme = useTheme()
  const classes = useStyles()
  const { pathname } = useLocation()
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx({
            [classes.hide]: open
          })}>
          <MenuIcon color={'primary'} />
        </IconButton>
        <img
          src={BRANDING.BRANDING === 'rytt' ? logorytt : logorap}
          className={`${smallScreen ? classes.smallLogo : classes.logo}`}
        />
        <NavBarTitle />

        <Box ml="auto">
          {isLoggedIn && <AccountMenuButton ml="auto" />}
          {!isLoggedIn && !pathname.includes('login') && <LoginButton />}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

const NavBarTitle = () => {
  const { pathname } = useLocation()
  const { filteredMenu, bottomMenu } = useContext(NavigationContext)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  // Combining both filteredMenu and bottomMenu Arrays in one flat Map and the selecting the active path
  const selectedNavOption = [
    ...filteredMenu.flatMap((filter) => filter.items),
    ...bottomMenu
  ].find((item) => pathname.includes(item.path))

  return selectedNavOption ? (
    <>
      {!matches && (
        <>
          <Box height={'50px'} ml={1} mr={2}>
            <Divider orientation="vertical" />
          </Box>
          <Box display={'flex'} style={{ gap: 8 }} alignItems="center">
            {typeof selectedNavOption?.icon === 'function' ? (
              selectedNavOption?.icon?.('primary')
            ) : (
              <TextIcon
                isActive={true}
                style={{ width: '25px', height: '25px' }}
                text={selectedNavOption?.icon}
              />
            )}

            <Typography
              variant="h5"
              style={{ color: 'black', width: 'fit-content' }}>
              {selectedNavOption?.label}
            </Typography>
          </Box>
        </>
      )}
    </>
  ) : null
}

export default NavBar
