import useAuthDialog from '@/features/authentication/dialogs/AuthDialog'
import useLimitExeedDialog from '@/features/subscription/featureAndUsage/dialogs/LimitExceedDialog'
import api from '@/services/trader'
import { Box, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AlertCsvDialog from '../../dialogs/AlertCSVDialog'
import { getAlerts } from '../../slices/alertSlice'

const useStyles = makeStyles((theme) => ({
  listIcon: {
    minWidth: 28
  }
}))

const ImportAlertCsvMenuItems = ({ handleClose }) => {
  const [response, setResponse] = React.useState(null)
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const { showAuthDialog } = useAuthDialog()
  const dispatch = useDispatch()
  const classes = useStyles()
  const { showLimitExeedDialog } = useLimitExeedDialog()
  // const toastId = useRef()

  const onCsvInputChange = async (e, tt = false) => {
    e.persist()

    if (!isLoggedIn) {
      showAuthDialog()
      return
    }
    const tId = toast.loading('Uploading CSV')
    try {
      let res
      if (tt) {
        res = await api.Alerts.Alerts.createFromTTCsv(e.target.files[0])
      } else {
        res = await api.Alerts.Alerts.createFromCsv(e.target.files[0])
      }

      toast.update(tId, {
        render: `${res.data.alertsCreated} alert(s) uploaded from CSV`,
        type: 'success',
        autoClose: 5000,
        isLoading: false
      })
      dispatch(getAlerts())
      setResponse(res.data)
    } catch (e) {
      toast.update(tId, {
        render: e.response.data.file
          ? e.response.data.file.join(' ')
          : 'There was an error uploading the CSV',
        type: 'error',
        isLoading: false,
        autoClose: 5000
      })
      if (e.response.status === 422) {
        showLimitExeedDialog(e.response.data.detail, 'alerts')
      }
    }
    e.target.value = ''
  }

  return (
    <>
      <label htmlFor="import-csv-file">
        <Box display={'flex'}>
          <ListItemIcon className={classes.listIcon}>
            <PublishIcon />
          </ListItemIcon>
          <ListItemText>Import CSV</ListItemText>
          {isLoggedIn && (
            <input
              type="file"
              id="import-csv-file"
              hidden
              onChange={(e) => {
                onCsvInputChange(e, false)
              }}
            />
          )}
        </Box>
      </label>

      <AlertCsvDialog
        response={response}
        handleClose={() => {
          setResponse(null)
        }}
      />
    </>
  )
}

export const ImportAlertTTCsvMenuItem = ({ onSuccess }) => {
  const [response, setResponse] = React.useState(null)
  const classes = useStyles()
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const { showAuthDialog } = useAuthDialog()
  const dispatch = useDispatch()
  const { showLimitExeedDialog } = useLimitExeedDialog()

  const onCsvInputChange = async (e, tt = false) => {
    e.persist()

    if (!isLoggedIn) {
      showAuthDialog()
      return
    }
    const tId = toast.loading('Uploading CSV')
    try {
      let res
      if (tt) {
        res = await api.Alerts.Alerts.createFromTTCsv(e.target.files[0])
      } else {
        res = await api.Alerts.Alerts.createFromCsv(e.target.files[0])
      }

      toast.update(tId, {
        render: `${res.data.alertsCreated} alert(s) uploaded from CSV`,
        type: 'success',
        autoClose: 5000,
        isLoading: false
      })
      dispatch(getAlerts())
      setResponse(res.data)
    } catch (e) {
      toast.update(tId, {
        render: e.response.data.file
          ? e.response.data.file.join(' ')
          : 'There was an error uploading the CSV',
        type: 'error',
        isLoading: false,
        autoClose: 5000
      })
      if (e.response.status === 422) {
        showLimitExeedDialog(e.response.data.detail, 'alerts')
      }
    }
    e.target.value = ''
  }

  return (
    <>
      <label htmlFor="import-csv-tt-file">
        <Box display={'flex'}>
          <ListItemIcon className={classes.listIcon}>
            <PublishIcon />
          </ListItemIcon>
          <ListItemText>Import TT CSV</ListItemText>
          {isLoggedIn && (
            <input
              type="file"
              id="import-csv-tt-file"
              hidden
              onChange={(e) => {
                onCsvInputChange(e, true)
              }}
            />
          )}
        </Box>
      </label>
      <AlertCsvDialog
        response={response}
        handleClose={() => {
          setResponse(null)
        }}
      />
    </>
  )
}

export default ImportAlertCsvMenuItems
