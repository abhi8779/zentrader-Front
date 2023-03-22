import DashboardPage from '@/components/DashboardPage'
import SubscriptionCheck from '@/components/SubscriptionCheck'
import SubscribeView from '@/features/subscription/pricing/lists/SubscribeView'
import { Box, Card } from '@material-ui/core'
import React from 'react'
import InstrumentCCDetails from '../../features/ath/athDetail/details/InstrumentCCDetails'
import AthList from '../../features/ath/Tabs/AthListTab'

const AthContainer = (props) => {
  return (
    <Box>
      <SubscriptionCheck
        planGroup={'ath'}
        isSubscribedComponent={
          <DashboardPage
            pageRoutes={[
              {
                path: 'list/',
                render: (props) => <AthList {...props} />,
                exact: true
              },
              {
                path: 'details/:id/',
                render: (props) => <InstrumentCCDetails {...props} />,
                exact: true
              }
            ]}
            loginRequired={true}
            LoginTitle={'To access ATH strategies, please login below'}
          />
        }
        notSubscribedComponent={
          <DashboardPage>
            <Box display="flex" justifyContent={'center'} mt={2}>
              <Card>
                <SubscribeView planGroup={'ath'} />
              </Card>
            </Box>
          </DashboardPage>
        }
      />
    </Box>
  )
}

export default AthContainer
