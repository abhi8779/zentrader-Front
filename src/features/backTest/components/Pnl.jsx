import { Box, Typography } from '@material-ui/core'
import { green, red } from '@material-ui/core/colors'
import React from 'react'

const Pnl = ({ title, pnl, ...props }) => {
  const positiveNegativeColor = (number) => {
    return number >= 0 ? green[500] : red[500]
  }

  return (
    <Box display={'flex'} flexDirection={'column'} {...props}>
      <Typography
        style={{ whiteSpace: 'nowrap' }}
        variant="body2"
        color="textSecondary">
        {title}
      </Typography>
      <Typography
        variant="body1"
        style={{ color: positiveNegativeColor(pnl), fontWeight: '600' }}>
        ₹{pnl}
      </Typography>
    </Box>
  )
}

export default Pnl
