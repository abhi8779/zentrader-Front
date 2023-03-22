import theme from '@/theme'
import { Box } from '@material-ui/core'
import moment from 'moment/moment'
import React from 'react'
import LabelValue from '../../../../components/LabelValue'
import { useSubscription } from '../hooks/useSubscriptionHook'

const SubscriptionSuccessView = ({ planGroup }) => {
  const { getSubscription } = useSubscription()
  const subscriptionData = getSubscription(planGroup)

  return (
    <Box>
      <Box padding={2}>
        <Box style={{ gap: theme.spacing(2) }} display="flex">
          <LabelValue
            label={'Plan Name'}
            value={`${subscriptionData?.plan?.plan_group?.name} - ${subscriptionData?.billing_plan.plan.name}`}
          />
          <LabelValue
            label={'Cycle Ends On'}
            value={` ${moment(subscriptionData?.cycle_end).format(
              'MMMM Do YYYY'
            )}`}
          />
          <LabelValue
            label={'Plan Expires On'}
            value={` ${moment(subscriptionData?.current_end).format(
              'MMMM Do YYYY'
            )}`}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SubscriptionSuccessView
