import { useConfirmationDialog } from '@/contexts/ConfirmContext'
import ZenApi from '@/services/trader'
import { Box, Button, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { Alert } from '@material-ui/lab'
import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import FeatureUsageView from '../../../featureAndUsage/lists/FeatureUsageList'
import { usePlanDialog } from '../../../pricing/dialogs/PlanDialog'
import { getSubscriptions } from '../../slices/subscriptionSlice'

const SubscriptionManagementItem = ({ sub }) => {
  const { showPlanDialog } = usePlanDialog()
  const dispatch = useDispatch()
  const { getConfirmation } = useConfirmationDialog()

  const formatCycle = (billingPlan) => {
    if (billingPlan?.cycle === 'monthly') {
      return (
        <>
          Billed <b>₹{billingPlan?.price}</b> monthly
        </>
      )
    }
    if (billingPlan?.cycle === 'annual') {
      return (
        <>
          Billed <b>₹{billingPlan?.price}</b> yearly
        </>
      )
    }
  }

  const cancelPlan = async (subId) => {
    try {
      await ZenApi.Subscription.Subscription.cancel(subId)
      toast.success('Your plan will cancel at the end date')
      dispatch(getSubscriptions())
    } catch (error) {
      toast.error('There was an error cancelling your plan')
    }
  }

  const undoCancelPlan = async (subId) => {
    try {
      await ZenApi.Subscription.Subscription.undoCancel(subId)
      toast.success('Your cancellation has been reverted')
      dispatch(getSubscriptions())
    } catch (error) {
      toast.error('There was an error undoing cancellation of your plan')
    }
  }

  return (
    <Box elevation={0} borderBottom={`1px solid ${grey[200]}`}>
      <Box mb={0} display="flex" alignItems="flex-start" p={2}>
        <Box>
          <Typography variant="subtitle2">
            {sub.plan.plan_group.name}
          </Typography>
          <Typography variant="h6" style={{ fontWeight: 700 }}>
            {sub.plan.name}
          </Typography>
          <Typography variant="body2">
            {formatCycle(sub.billing_plan)}
          </Typography>
          {sub.current_end && (
            <Typography variant="caption">
              {sub.cancel_at_period_end ? 'Cancels on' : 'Expires On'}:{' '}
              {moment(sub.current_end).format('DD MMM YYYY')}
            </Typography>
          )}
        </Box>
        <Box ml="auto">
          {sub.cancel_at_period_end ? (
            <Button
              variant="text"
              size="small"
              color="default"
              onClick={() => {
                undoCancelPlan(sub.id)
              }}>
              Undo Cancel
            </Button>
          ) : (
            !sub.complimentary &&
            !sub.trial && (
              <Button
                variant="text"
                size="small"
                color="default"
                onClick={async () => {
                  if (
                    await getConfirmation({
                      title: `Cancel plan?`,
                      message: `Are you sure you want to cancel this plan? The plan will be cancelled on ${moment(
                        sub.current_end
                      ).format('DD MMM YYYY')}`,
                      btnConfirmText: 'Cancel'
                    })
                  ) {
                    cancelPlan(sub.id)
                  }
                }}>
                Cancel
              </Button>
            )
          )}
          <Button
            variant="text"
            size="small"
            color="primary"
            onClick={() => {
              showPlanDialog(sub.plan.plan_group.tag)
            }}>
            Change/Renew
          </Button>
        </Box>
      </Box>

      {sub.status === 'active' &&
        (sub.trial || sub.complimentary) &&
        sub.current_end && (
          <Alert severity="info">
            Your {sub.trial ? 'trial' : 'complimentary'} plan will expire{' '}
            {moment(sub.current_end).fromNow()}
          </Alert>
        )}

      <FeatureUsageView subscription={sub} />
    </Box>
  )
}

export default SubscriptionManagementItem
