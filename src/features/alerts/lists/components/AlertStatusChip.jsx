import { Chip } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import React from 'react'

const AlertStatusChip = ({ status }) => {
  const statusLabel = {
    active: 'Active',
    triggered: 'Triggered'
  }
  return (
    <>
      <Chip
        label={statusLabel[status]}
        size="small"
        style={{
          background: status === 'active' ? green[500] : 'default',
          color: status === 'active' ? 'white' : 'default'
        }}
      />
    </>
  )
}

export default AlertStatusChip
