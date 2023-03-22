import AlertBox from '@/components/AlertBox'
import { useFeature } from '@/features/subscription/featureAndUsage/hooks/useFeatureHook'
import { usePlanDialog } from '@/features/subscription/pricing/dialogs/PlanDialog'
import { useSubscription } from '@/features/subscription/subscriptionManagement/hooks/useSubscriptionHook'
import { Button } from '@material-ui/core'
import moment from 'moment'
import React from 'react'

const FeatureUsageExceededAlert = () => {
  const { showPlanDialog } = usePlanDialog()
  const { getSubscription } = useSubscription()
  const { getFeature } = useFeature()
  const trigFeat = getFeature('triggered_alerts')
  const subscription = getSubscription('alerts')

  return (
    subscription?.status === 'active' &&
    trigFeat &&
    Boolean(trigFeat.limit) &&
    trigFeat.usage >= trigFeat.limit && (
      <AlertBox
        severity="error"
        text={` You have used your accounts limit of ${
          trigFeat.limit
        } monthly triggered alerts. Please wait for your cycle to renew on ${moment(
          subscription.cycle_end
        ).format('DD MMM YYYY')} or upgrade your
        plan to get more triggered alerts`}
        actionComponent={
          <Button
            style={{
              whiteSpace: 'nowrap',
              minWidth: 'auto'
            }}
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => {
              showPlanDialog('alerts')
            }}>
            View Plans
          </Button>
        }
      />
    )
  )
}

export default FeatureUsageExceededAlert
