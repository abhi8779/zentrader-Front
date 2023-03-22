import AlertBox from '@/components/AlertBox'
import { useFeature } from '@/features/subscription/featureAndUsage/hooks/useFeatureHook'
import { usePlanDialog } from '@/features/subscription/pricing/dialogs/PlanDialog'
import { useSubscription } from '@/features/subscription/subscriptionManagement/hooks/useSubscriptionHook'
import { Button, Typography } from '@material-ui/core'
import moment from 'moment'
import React from 'react'

const TrialOrComplementaryActiveInfo = () => {
  const { showPlanDialog } = usePlanDialog()
  const { getSubscription } = useSubscription()
  const { getFeature } = useFeature()
  const trigFeat = getFeature('triggered_alerts')
  const subscription = getSubscription('alerts')

  return (
    subscription?.status === 'active' &&
    (subscription?.trial === true || subscription?.complimentary === true) &&
    trigFeat &&
    Boolean(trigFeat.limit) &&
    trigFeat.usage < trigFeat?.limit && (
      <AlertBox
        // This id is necessary for the joyride tour
        id="banner"
        severity={trigFeat?.usage >= trigFeat?.limit - 10 ? 'error' : 'info'}
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
            {`View Plans`}
          </Button>
        }
        text={
          <>
            <Typography variant="body2">
              You are currently on a {subscription?.trial ? 'Trial' : ''}
              {subscription?.complimentary ? 'Complimentary' : ''} plan, You
              have used {trigFeat.usage}/{trigFeat.limit} of your monthly
              triggered alerts limit.
            </Typography>
            {subscription.current_end && (
              <Typography style={{ fontSize: '11px' }}>
                This will expire in {moment(subscription.current_end).fromNow()}
                *
              </Typography>
            )}
          </>
        }
      />
    )
  )
}

export default TrialOrComplementaryActiveInfo
