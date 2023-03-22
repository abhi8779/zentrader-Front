import { logout } from '@/features/accounts/slices/userSlice'
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  // Menu
  accountMenu: {
    '& .MuiPaper-root': {
      minWidth: 200
    }
  }
}))

export const AccountMenuButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const user = useSelector((s) => s.user.user)
  const history = useHistory()
  const theme = useTheme()
  const classes = useStyles()
  const dispatch = useDispatch()
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {smallScreen ? (
        <IconButton color="primary" onClick={handleMenu}>
          <AccountCircle />
        </IconButton>
      ) : (
        <Button
          fullWidth
          style={{ width: 'fit-content' }}
          startIcon={<AccountCircle />}
          aria-label="account menu"
          aria-controls="account-menu"
          aria-haspopup="true"
          onClick={handleMenu}
          color="primary">
          {user?.first_name} {user?.last_name}
        </Button>
      )}
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        className={classes.accountMenu}>
        {smallScreen && (
          <MenuItem disabled>
            <ListItemText>
              Hi, {user?.first_name} {user?.last_name}
            </ListItemText>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleClose()
            history.push('/account/')
          }}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText>Account Details</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            dispatch(logout())
            history.push('/login/')
          }}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
