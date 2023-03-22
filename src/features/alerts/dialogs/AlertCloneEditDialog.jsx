import AlertEditCloneForm from '@/features/alerts/forms/AlertEditCloneForm'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'

import React from 'react'

const AlertCloneEditDialog = ({ alert, mode, onClose }) => {
  return (
    <Dialog open={Boolean(alert)} onClose={onClose}>
      <DialogTitle>
        {mode === 'create' ? 'Create Alert' : 'Update Alert'}
      </DialogTitle>
      <DialogContent>
        {alert && (
          <AlertEditCloneForm alert={alert} mode={mode} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AlertCloneEditDialog
