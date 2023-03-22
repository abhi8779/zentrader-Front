import DashboardPage from '@/components/DashboardPage'
import AuthView from '@/features/authentication/forms/AuthView'
import { Box, Card, useTheme } from '@material-ui/core'
import React from 'react'

const LoginPage = () => {
  const theme = useTheme()
  return (
    <DashboardPage>
      <Box mx="auto">
        <Box width={'400px'}>
          <Card
            style={{
              marginTop: theme.spacing(2),
              padding: theme.spacing(4),
              overflow: 'visible'
            }}>
            <AuthView />
          </Card>
        </Box>
      </Box>
    </DashboardPage>
  )
}

export default LoginPage
