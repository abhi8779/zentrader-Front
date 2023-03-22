import useAuthDialog from '@/features/authentication/dialogs/AuthDialog'
import api from '@/services/trader'
import { Box, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  listIcon: {
    minWidth: 28
  }
}))

const ExportCsvMenuItem = ({
  onSuccess,
  selectAllChecked,
  selectedAlerts,
  counts
}) => {
  const { showAuthDialog } = useAuthDialog()
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const classes = useStyles()

  const downloadCsvHandler = async () => {
    try {
      await api.Alerts.Alerts.downloadCsv(
        selectAllChecked ? { all: true } : { ids: Array.from(selectedAlerts) }
      )
      toast.success(
        `${
          selectAllChecked
            ? counts > 1
              ? ` ${counts} alerts`
              : ` ${counts} alert`
            : selectedAlerts.size > 1
            ? `${selectedAlerts.size} alerts`
            : `${selectedAlerts.size} alert`
        } exported`
      )
    } catch (e) {
      toast.error(`Something went wrong`)
    }
    onSuccess()
  }

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      id="export-csv"
      onClick={async () => {
        if (!isLoggedIn) {
          showAuthDialog()
          return
        }
        if (!selectedAlerts.size) {
          toast.error('Please select some alerts from the list to export')
          return
        }
        downloadCsvHandler()
      }}>
      <ListItemIcon className={classes.listIcon}>
        <GetAppIcon />
      </ListItemIcon>
      <ListItemText>Export CSV</ListItemText>
    </Box>
  )
}

export default ExportCsvMenuItem
