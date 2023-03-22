import useAuthDialog from '@/features/authentication/dialogs/AuthDialog'
import api from '@/services/trader'
import { Box, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import TocIcon from '@material-ui/icons/Toc'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  listIcon: {
    minWidth: 28
  }
}))

const DownloadTemplateMenuItem = ({ onSuccess }) => {
  const classes = useStyles()
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const { showAuthDialog } = useAuthDialog()

  const getTemplateHandler = async () => {
    try {
      await api.Alerts.Alerts.downloadCsv(
        { ids: [] },
        'alerts-csv-template.csv'
      )
      toast.success(`Template Downloaded`)
      onSuccess()
    } catch (e) {
      console.error(e)
      toast.error(`Template Was Not Downloaded!`)
    }
  }

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      id="download-template"
      onClick={() => {
        if (!isLoggedIn) {
          showAuthDialog()
        }
        getTemplateHandler()
      }}>
      <ListItemIcon className={classes.listIcon}>
        <TocIcon />
      </ListItemIcon>
      <ListItemText>Download Template</ListItemText>
    </Box>
  )
}

export default DownloadTemplateMenuItem
