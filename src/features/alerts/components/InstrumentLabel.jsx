import { Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import moment from 'moment'
import React from 'react'

const InstrumentLabel = ({ instrument }) => {
  const typeLabel = {
    CE: 'CALL',
    PE: 'PUT',
    FUT: 'FUTURE'
  }
  return (
    <>
      <Typography variant="body2">
        {instrument.name || instrument.tradingsymbol}
      </Typography>
      <Typography variant="caption" color="primary" style={{ fontWeight: 700 }}>
        {typeLabel[instrument.type]}{' '}
        {instrument.strike !== 0 && instrument.strike}
      </Typography>
      <Typography variant="caption" style={{ color: grey[900], marginLeft: 4 }}>
        {instrument.expiry &&
          moment(instrument.expiry.date).format('DD MMM YYYY')}
      </Typography>
    </>
  )
}

export default InstrumentLabel
