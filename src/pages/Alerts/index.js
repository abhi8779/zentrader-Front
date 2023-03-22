import DashboardPage from '@/components/DashboardPage'
import SubscriptionCheck from '@/components/SubscriptionCheck'
import { AlertsTabContextProvider } from '@/features/alerts/contexts/AlertTabsContext'
import SubscribeView from '@/features/subscription/pricing/lists/SubscribeView'
import { Box, Card } from '@material-ui/core'
import React from 'react'
import AlertsTab from '../../features/alerts'

const AlertsContainer = () => {
  return (
    <DashboardPage>
      <SubscriptionCheck
        planGroup={'alerts'}
        isSubscribedComponent={
          <AlertsTabContextProvider>
            <AlertsTab />
          </AlertsTabContextProvider>
        }
        notSubscribedComponent={
          <Box display="flex" justifyContent={'center'} mt={2}>
            <Card>
              <SubscribeView planGroup={'alerts'} />
            </Card>
          </Box>
        }
      />
    </DashboardPage>
  )
}

export default AlertsContainer
