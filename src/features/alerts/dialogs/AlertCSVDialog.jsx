import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import React from 'react'
import ErrorsTable from '../lists/ErrorsTable'

const AlertCsvDialog = ({ response, handleClose }) => {
  return (
    <Dialog open={Boolean(response)} onClose={handleClose} maxWidth="sm">
      <DialogTitle>{'Import Alerts From CSV'}</DialogTitle>
      <DialogContent>
        {response?.alertsCreated > 0 && (
          <Alert severity="success">
            <AlertTitle>
              {response.alertsCreated} alert(s) successfully created
            </AlertTitle>
          </Alert>
        )}
        {response?.errors && response?.errors.length > 0 && (
          <ErrorsTable errors={response.errors} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AlertCsvDialog
