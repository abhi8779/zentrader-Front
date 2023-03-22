import LoadingButton from '@/components/LoadingButton'
import { useActivateSubscriptionDialog } from '@/features/subscription/subscriptionManagement/dialogs/ActivateSubscriptionDialog'
import api from '@/services/trader'
import { Box, Typography } from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'
import { round } from 'lodash'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSubscriptions } from '../../../subscriptionManagement/slices/subscriptionSlice'
import { usePaymentDialog } from '../../dialogs/OrderPreviewDialog'

const PlanCard = ({
  months,
  plan,
  intervalMonths,
  subscription,
  onSubscribeSuccess,
  planGroup,
  discount
}) => {
  const [loading, setLoading] = React.useState(false)
  const showPaymentDialog = usePaymentDialog()
  const dispatch = useDispatch()
  const history = useHistory()
  const { showActivateSubscriptionDialog } = useActivateSubscriptionDialog()

  const successPathMap = {
    alerts: '/alerts/',
    ath: '/ath/'
  }

  const planExpired = subscription?.status !== 'active'

  const currentPlanRank = subscription?.plan.order
  const planRank = plan.order

  // Filter out trial plans
  plan.billing_plans = plan.billing_plans.filter(
    (x) => !x.trial || plan.name === 'Free'
  )
  const billingPlan = plan.billing_plans.filter(
    (x) => x.interval_months === intervalMonths || plan.name === 'Free'
  )[0]

  function getBtnText() {
    if (plan.name === 'Free') {
      return ''
    }
    if (subscription?.trial || !subscription || planExpired) {
      return 'Select Plan'
    }

    if (planRank === currentPlanRank) {
      return 'Extend'
    }
    if (planRank < currentPlanRank) {
      return ''
    }
    if (planRank > currentPlanRank) {
      return 'Upgrade'
    }
  }

  const btnText = getBtnText()
  const month = billingPlan?.interval_months
  const isSubscribed = subscription?.billing_plan?.id === billingPlan?.id
  const finalPrice = round(
    discount
      ? billingPlan?.price - billingPlan?.price * (discount.percentage / 100)
      : billingPlan?.price
  )
  const discountedMonthlyPrice = round(finalPrice / month)
  const baseMonthlyPrice = round(billingPlan?.price / month)

  const cycleMap = {}
  months.forEach(
    (x) =>
      (cycleMap[x] = (
        <>
          {discount ? (
            <>
              Billed{' '}
              <b style={{ textDecoration: 'line-through' }}>
                ₹{billingPlan?.price}
              </b>
              <b style={{ color: green[500] }}> ₹{finalPrice}</b> {month} month
            </>
          ) : (
            <>
              {' '}
              Billed <b>₹{finalPrice}</b> every{' '}
              {month > 1 ? `${month} months` : 'month'}
            </>
          )}
        </>
      ))
  )

  const subscribeToPlan = async () => {
    setLoading(true)

    try {
      const res = await api.Subscription.Order.preview(
        [billingPlan?.id],
        discount?.id
      )
      showPaymentDialog({
        discount,
        data: res.data,
        onSuccess: () => {
          setLoading(false)

          dispatch(getSubscriptions())
          if (successPathMap[planGroup]) {
            history.push(successPathMap[planGroup])
          }
          onSubscribeSuccess && onSubscribeSuccess()
          showActivateSubscriptionDialog(planGroup)
        },
        onClose: () => {
          setLoading(false)
        }
      })
    } catch (e) {
      setLoading(false)
      toast.error(e.response.data.non_field_errors)
    }
  }

  if (!billingPlan) {
    return null
  }

  return (
    <th
      key={plan.id}
      style={{
        borderTop: `1px solid ${grey[300]}`,
        borderLeft: `1px solid ${grey[300]}`,
        borderRight: `1px solid ${grey[300]}`
      }}>
      <Box bgcolor="#fff" borderRadius={4} overflow="hidden">
        <Box p={2}>
          <Typography
            variant="h4"
            style={{
              fontWeight: plan.name === 'Pro' ? 900 : 500,
              marginBottom: 8
            }}>
            {plan.name.toUpperCase()}
          </Typography>
          {discount && (
            <Box display="flex" alignItems="flex-end" justifyContent="center">
              <Box style={{ textDecoration: 'line-through' }}>
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: 700
                  }}>
                  ₹ {baseMonthlyPrice}
                </Typography>
              </Box>
              <Typography variant="body1" color="textSecondary">
                /month
              </Typography>
            </Box>
          )}

          {plan.name !== 'Free' && (
            <Box display="flex" alignItems="flex-end" justifyContent="center">
              <Typography
                variant="h5"
                style={{
                  fontWeight: 700,
                  color: green[500]
                }}>
                ₹ {discountedMonthlyPrice}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                /month
              </Typography>
            </Box>
          )}

          <Typography variant="subtitle2" color="textSecondary">
            {cycleMap[month]}
          </Typography>
        </Box>

        <Box p={2}>
          {btnText && (
            <LoadingButton
              variant="contained"
              color="primary"
              fullWidth
              size="medium"
              onClick={subscribeToPlan}
              isLoading={loading}
              btnText={btnText}
            />
          )}
          {isSubscribed && (
            <Typography variant="caption">Current Plan</Typography>
          )}
        </Box>
      </Box>
    </th>
  )
}

export default PlanCard
