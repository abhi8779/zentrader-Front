import { Box } from '@material-ui/core'
import React from 'react'

const SquaredChip = ({ label, bgColor }) => {
  return (
    <Box
      bgcolor={bgColor}
      borderRadius={2}
      // padding={1}
      textAlign="center"
      height="20px"
      width="20px"
      lineHeight={1.6}
      color="white"
      fontSize={12}>
      {label}
    </Box>
  )
}

export default SquaredChip
