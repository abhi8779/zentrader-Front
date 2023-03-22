import { Box, Typography } from '@material-ui/core'
import React from 'react'

const PageHeader = ({ title, description }) => {
  return (
    <Box mt={2} mb={2}>
      <Typography variant="h6" style={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {description}
      </Typography>
    </Box>
  )
}

export default PageHeader
