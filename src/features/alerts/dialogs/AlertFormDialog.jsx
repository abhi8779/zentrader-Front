import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import React, { useContext } from 'react'
import AlertsTabContext from '../contexts/AlertTabsContext'
import AlertForm from '../forms/AlertForm'

const AlertFormDialog = () => {
  const { dialogOpen, openAlertDialog, selectedAlert } = useContext(
    AlertsTabContext
  )

  const handleClose = () => {
    openAlertDialog(false)
  }

  return (
    <Dialog open={dialogOpen} onClose={handleClose} maxWidth="xs">
      <DialogTitle style={{ paddingTop: '5px', paddingBottom: '5px' }}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          {selectedAlert ? 'Update Alert' : 'Create Alert'}
          <IconButton onClick={handleClose} aria-label="delete">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <AlertForm onSuccess={handleClose} />
      </DialogContent>
    </Dialog>
  )
}
export default AlertFormDialog
