import { Box, Container, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <Container>
      <Box paddingBottom={2} paddingTop={2} display="flex" alignItems="center">
        <Link
          to="/privacy"
          style={{ textDecoration: 'none', color: grey[500], marginRight: 16 }}>
          <Typography variant="body1" align="center">
            Privacy Policy
          </Typography>
        </Link>
        <Link to="/terms/" style={{ textDecoration: 'none', color: grey[500] }}>
          <Typography variant="body1" align="center">
            Terms
          </Typography>
        </Link>
      </Box>
    </Container>
  )
}
