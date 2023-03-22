import theme from '@/theme'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, { useState } from 'react'
import DateChipValue from '../components/DateChipValue'

export default function ViewDetailTrade({ metadata }) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant="text"
        size="small"
        color="primary"
        onClick={handleClickOpen}
        style={{
          fontSize: '11px'
        }}>
        View Details
      </Button>
      <Dialog
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Order Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <DateChipValue
                label={'2 Days'}
                value={metadata['2dhh'] || '-'}
                valueDes={metadata['2dll'] || '-'}
              />

              <DateChipValue
                style={{ marginTop: theme.spacing(2) }}
                label={'9:20 AM'}
                value={metadata['920_high'] || '-'}
                valueDes={metadata['920_low'] || '-'}
              />
            </Grid>
            <Grid item>
              <DateChipValue
                label={'Day'}
                value={metadata.day_high || '-'}
                valueDes={metadata.day_low || '-'}
              />

              <DateChipValue
                style={{ marginTop: theme.spacing(2) }}
                label={'9:30 AM'}
                value={metadata['930_high'] || '-'}
                valueDes={metadata['930_low'] || '-'}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
