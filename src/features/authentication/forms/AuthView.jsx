import logorap from '@/assets/images/ap-logo-black.png'
import logorytt from '@/assets/images/rytt-logo.png'
import BRANDING from '@/config'
import theme from '@/theme'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import UnifiedAuth from './UnifiedAuth'

const AuthView = (params) => {
  return (
    <Box>
      <Box display={'flex'} justifyContent="center">
        <img
          style={{ height: '50px' }}
          src={BRANDING.BRANDING === 'rytt' ? logorytt : logorap}
        />
      </Box>
      <Typography
        variant="h5"
        align="center"
        style={{ fontWeight: 700, marginBottom: theme.spacing(1) }}>
        Login/Signup
      </Typography>
      <Typography
        align="center"
        variant="body1"
        style={{ marginBottom: theme.spacing(1) }}>
        Please verify your number to get started
      </Typography>
      <UnifiedAuth />
    </Box>
  )
}

export default AuthView
