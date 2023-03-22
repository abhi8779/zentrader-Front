import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import React from 'react'

const AlertStatusMob = ({ status }) => {
  return (
    <>
      {status === 'active' ? (
        <FiberManualRecordIcon style={{ color: '#29de70' }} />
      ) : (
        <FiberManualRecordIcon />
      )}
    </>
  )
}

export default AlertStatusMob
