import { Box, Typography } from '@material-ui/core'
import React from 'react'

const LabelValueDes = ({
  label,
  value,
  valueDes,
  valueColor = 'black',
  bold,
  ...props
}) => {
  return (
    <Box display={'flex'} flexDirection="column" {...props}>
      <Typography variant="body2" color="textSecondary">
        {label}
      </Typography>
      <Typography
        variant="body1"
        style={{ color: valueColor, fontWeight: bold ? 700 : 500 }}>
        {value}
      </Typography>
      <Typography
        variant="body1"
        style={{ color: valueColor, fontWeight: bold ? 700 : 500 }}>
        {value}
      </Typography>
    </Box>
  )
}

export default LabelValueDes
