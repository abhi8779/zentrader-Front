import { Box, Typography } from '@material-ui/core'
import { green, red } from '@material-ui/core/colors'
import React from 'react'
import SquaredChip from './SquaredChip'

const DateChipValue = ({
  label,
  value,
  valueDes,
  valueColor = 'black',
  bold,
  ...props
}) => {
  return (
    <Box {...props}>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Box display={'flex'} style={{ gap: '6px' }} mt={1}>
        <SquaredChip label="H" bgColor={green[400]} />
        <Typography
          variant="body1"
          style={{
            fontWeight: 500
          }}>
          {value}
        </Typography>
      </Box>
      <Box display={'flex'} style={{ gap: '6px' }} mt={1}>
        <SquaredChip label="L" bgColor={red[300]} />
        <Typography
          variant="body1"
          style={{
            fontWeight: 500
          }}>
          {valueDes}
        </Typography>
      </Box>
    </Box>
  )
}

export default DateChipValue
