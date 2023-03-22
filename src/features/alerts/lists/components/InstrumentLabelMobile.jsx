import { Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import moment from 'moment'
import React from 'react'

const InstrumentLabelMobile = ({ instrument }) => {
  const typeLabel = {
    CE: 'CALL',
    PE: 'PUT',
    FUT: 'FUTURE'
  }
  return (
    <>
      <Typography variant="body2" style={{ fontSize: '10px' }}>
        {instrument.name || instrument.tradingsymbol}
      </Typography>
      <Typography
        variant="caption"
        color="primary"
        style={{ fontWeight: 700, fontSize: '10px' }}>
        {typeLabel[instrument.type]}{' '}
        {instrument.strike !== 0 && instrument.strike}
      </Typography>
      <Typography
        variant="caption"
        style={{ color: grey[900], fontSize: '10px' }}>
        {instrument.expiry &&
          moment(instrument.expiry.date).format('DD MMM YYYY')}
      </Typography>
    </>
  )
}

export default InstrumentLabelMobile
