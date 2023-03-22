import OtpRequestForm from '@/features/authentication/forms/OtpRequestForm'
import OtpVerifyForm from '@/features/authentication/forms/OtpVerifyForm'
import ZenApi from '@/services/trader'
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const useStyles = makeStyles(() => ({
  dialog: {
    '& .MuiDialog-paper': {
      maxWidth: 320
    }
  }
}))

const WCFormDialog = ({ wc, open, onClose, onSuccess }) => {
  const [otpData, setOtpData] = useState(null)
  const reason = wc ? 'edit' : 'add'
  const classes = useStyles()

  useEffect(() => {
    if (open) {
      setOtpData(null)
    }
  }, [open])

  const onVerify = async (otpData) => {
    try {
      if (otpData.reason === 'add') {
        await ZenApi.Wati.create(otpData.id)
        toast.success('WhatsApp number added')
      } else {
        await ZenApi.Wati.update(wc.id, otpData.id)
        toast.success('WhatsApp number updated')
      }
      onSuccess && onSuccess()
    } catch (e) {
      if (e.response.data.non_field_errors) {
        toast.error(e.response.data.non_field_errors.join(' '))
      }
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className={classes.dialog}>
      <DialogTitle>
        {wc ? 'Edit WhatsApp Number' : 'Add WhatsApp Number'}
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          {!otpData && (
            <OtpRequestForm
              title={
                wc
                  ? 'Verify the new number to edit'
                  : 'Verify the number to be added'
              }
              reason={reason}
              onSuccess={(data) => {
                setOtpData(data)
              }}
            />
          )}

          {otpData && !otpData.verified && (
            <OtpVerifyForm
              reason={reason}
              phone={otpData.phone}
              onSuccess={onVerify}
              onBack={() => {
                setOtpData(null)
              }}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default WCFormDialog
