import logoWhite from '@/assets/images/zentrader-logo-white.png'
import { logout } from '@/features/accounts/slices/userSlice'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 64
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  logo: {
    height: 25
  },
  action: {
    marginLeft: 'auto'
  }
}))

export default function ButtonAppBar() {
  const classes = useStyles()
  const dispatch = useDispatch()
  // const { logout } = React.useContext(AuthContext)

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton> */}
          <img src={logoWhite} />
          {/* <Typography variant="h6" className={classes.title}>
						MPAT Trading Tool
					</Typography> */}
          <Button
            className={classes.action}
            color="inherit"
            onClick={() => {
              dispatch(logout())
              // history.push("/login");
            }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
