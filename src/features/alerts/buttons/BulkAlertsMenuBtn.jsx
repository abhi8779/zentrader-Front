import useAuthDialog from '@/features/authentication/dialogs/AuthDialog'
import {
  Button,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem
} from '@material-ui/core'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import TableChartIcon from '@material-ui/icons/TableChart'
import React, { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import AlertsTabContext from '../contexts/AlertTabsContext'
import { useHelpCSVDialog } from '../dialogs/HelpCSVDialog'
import DownloadTemplateMenuItem from './componets/DownloadTemplateMenuItem'
import ExportCsvMenuItem from './componets/ExportCsvMenuItem'
import ImportAlertCsvMenuItem, {
  ImportAlertTTCsvMenuItem
} from './componets/ImportAlertCsvMenuItems'

const useStyles = makeStyles((theme) => ({
  listIcon: {
    minWidth: 28
  }
}))

const BulkAlertsMenuBtn = ({ selectedAlerts, selectAllChecked, counts }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const classes = useStyles()
  const { showHelpCSVDialog } = useHelpCSVDialog()
  const { openBulkAlerts } = useContext(AlertsTabContext)
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const { showAuthDialog } = useAuthDialog()
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const myRefname = useRef(null)

  const handleClick = () => {
    myRefname.current.click()
  }

  useEffect(() => {
    openBulkAlerts ? handleClick() : handleClose()
  }, [openBulkAlerts])

  return (
    <>
      <Button
        id="bulk-alert"
        startIcon={<TableChartIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        aria-label="account menu"
        aria-controls="account-menu"
        aria-haspopup="true"
        size="small"
        ref={myRefname}
        onClick={handleMenu}
        color="primary">
        Bulk Alerts
      </Button>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={open}
        onClose={handleClose}>
        <MenuItem id="export-csv" disabled={selectedAlerts.size === 0}>
          <ExportCsvMenuItem
            counts={counts}
            selectAllChecked={selectAllChecked}
            selectedAlerts={selectedAlerts}
            onSuccess={() => {
              handleClose()
            }}
          />
        </MenuItem>
        <MenuItem
          id="import-csv"
          onClick={() => {
            if (!isLoggedIn) {
              showAuthDialog()
            }
            handleClose()
          }}>
          <ImportAlertCsvMenuItem />
        </MenuItem>
        <MenuItem
          id="import-tt-csv"
          onClick={() => {
            if (!isLoggedIn) {
              showAuthDialog()
            }
            handleClose()
          }}>
          <ImportAlertTTCsvMenuItem />
        </MenuItem>
        <MenuItem id="download-template">
          <DownloadTemplateMenuItem
            onSuccess={() => {
              handleClose()
            }}
          />
        </MenuItem>
        <MenuItem
          id="help"
          onClick={() => {
            showHelpCSVDialog()
            handleClose()
          }}>
          <ListItemIcon className={classes.listIcon}>
            <HelpOutlineIcon />
          </ListItemIcon>
          <ListItemText>Help</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default BulkAlertsMenuBtn
