import { Box, Typography } from '@material-ui/core'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import React from 'react'

export const TrendLblVal = ({
  label,
  value,
  caption,
  valColor = 'black',
  bold,
  verified,
  ...props
}) => {
  return (
    <Box {...props}>
      <Box display={'flex'} alig={'center'}>
        <Box>
          <Typography variant="subtitle1" color="textSecondary">
            {label}
          </Typography>
        </Box>
        <Box ml={1} display={'flex'} alignItems={'center'}>
          {verified && <VerifiedUserIcon fontSize="small" color="primary" />}
        </Box>
      </Box>
      <Typography
        variant="body1"
        style={{ color: valColor, fontWeight: bold ? 700 : 500 }}>
        {value}
      </Typography>
      {caption && <Typography variant="caption">{caption}</Typography>}
    </Box>
  )
}

export default TrendLblVal
