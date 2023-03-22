import { Box } from '@material-ui/core'
import React from 'react'

const SmallChip = ({ label, color = 'white', bgColor = 'white', ...props }) => {
  return (
    <>
      <Box
        bgcolor={bgColor}
        fontSize={10}
        py={0.3}
        px={0.5}
        display="inline-block"
        borderRadius={4}
        color={color}
        {...props}>
        {label}
      </Box>
    </>
  )
}

export default SmallChip
