import api from '@/services/trader'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingButton from '../../../../components/LoadingButton'
import { getSubscriptions } from '../../subscriptionManagement/slices/subscriptionSlice'
import { usePaymentDialog } from '../dialogs/OrderPreviewDialog'

const useStyles = makeStyles((theme) => ({
  table: {
    borderBottom: `1px solid ${grey[300]}`
  },
  planCardCell: {
    borderTop: `1px solid ${grey[300]}`,
    borderLeft: `1px solid ${grey[300]}`,
    borderRight: `1px solid ${grey[300]}`
  },
  featureCell: {
    borderTop: `1px solid ${grey[300]}`,
    borderLeft: `1px solid ${grey[300]}`,
    borderRight: `1px solid ${grey[300]}`,
    padding: theme.spacing(1),
    fontWeight: 700
  },
  featureTitleCell: {
    textAlign: 'left',
    fontSize: 14,
    backgroundColor: grey[100],
    padding: theme.spacing(1),
    borderTop: `1px solid ${grey[300]}`,
    borderLeft: `1px solid ${grey[300]}`,
    fontWeight: 500
  },
  checkIcon: {
    color: green[500],
    fontSize: 16
  },
  crossIcon: {
    color: grey[300],
    fontSize: 16
  },
  planCard: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2)
  }
}))

const SinglePlanView = ({ planGroup, subscription, discount }) => {
  const [plans, setPlans] = React.useState(null)
  const classes = useStyles()

  React.useEffect(() => {
    fetchPlans()
  }, [planGroup])

  const fetchPlans = async () => {
    const res = await api.Subscription.Plan.get({
      plan_group__tag: planGroup,
      expand: 'billing_plans'
    })

    setPlans(res.data.results)
  }

  return (
    <Box p={2} textAlign="center">
      <Typography variant="body2">Select a plan to continue</Typography>
      <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
        <table cellSpacing="0" className={classes.table}>
          <thead>
            <tr>
              <th></th>
              {plans &&
                plans[0].billing_plans.map((plan) => (
                  <th key={plan.id} className={classes.planCardCell}>
                    <PlanCard
                      plan={plan}
                      discount={discount}
                      subscription={subscription}
                      planGroup={planGroup}
                    />
                  </th>
                ))}
            </tr>
          </thead>
        </table>
      </Box>
    </Box>
  )
}

const PlanCard = ({
  plan,
  intervalMonths,
  subscription,
  planGroup,
  discount
}) => {
  const [loading, setLoading] = React.useState(false)
  const showPaymentDialog = usePaymentDialog()
  const dispatch = useDispatch()
  const history = useHistory()
  const successPathMap = {
    ath: '/ath/list/'
  }
  const planRankMap = [1, 6, 12]
  const currentPlanRank = planRankMap.indexOf(
    subscription?.billing_plan.interval_months
  )
  const planExpired = subscription?.status !== 'active'

  const planRank = planRankMap.indexOf(plan.interval_months)

  function getBtnText() {
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

  const isSubscribed = subscription?.billing_plan?.id === plan.id
  const monthlyPrice = Math.round(plan.price / plan.interval_months)
  const finalPrice = Math.round(
    discount
      ? plan?.price - plan?.price * (discount.percentage / 100)
      : plan?.price
  )
  // const discountPrice = plan.discount_price

  const cycleMap = {
    1: (
      <>
        {discount ? (
          <>
            Billed{' '}
            <b style={{ textDecoration: 'line-through' }}>₹{plan?.price}</b>
            <b style={{ color: green[500] }}> ₹{finalPrice}</b> monthly
          </>
        ) : (
          <>
            {' '}
            Billed <b>₹{plan?.price}</b> monthly{' '}
          </>
        )}
      </>
    ),
    6: (
      <>
        {discount ? (
          <>
            Billed{' '}
            <b style={{ textDecoration: 'line-through' }}>₹{plan?.price}</b>
            <b style={{ color: green[500] }}> ₹{finalPrice}</b> every six month
          </>
        ) : (
          <>
            {' '}
            Billed <b>₹{plan?.price}</b> every six month{' '}
          </>
        )}
      </>
    ),
    12: (
      <>
        {discount ? (
          <>
            Billed{' '}
            <b style={{ textDecoration: 'line-through' }}>₹{plan?.price}</b>
            <b style={{ color: green[500] }}> ₹{finalPrice}</b> annually
          </>
        ) : (
          <>
            {' '}
            Billed <b>₹{plan?.price}</b> annually{' '}
          </>
        )}
      </>
    )
  }

  const subscribeToPlan = async () => {
    setLoading(true)
    try {
      const res = await api.Subscription.Order.preview([plan.id], discount?.id)
      showPaymentDialog({
        discount: discount,
        data: res.data,
        onSuccess: () => {
          setLoading(false)
          dispatch(getSubscriptions())
          if (successPathMap[planGroup]) {
            history.push(successPathMap[planGroup])
          }
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

  return (
    <Box
      // border={`1px solid ${grey[300]}`}
      bgcolor="#fff"
      borderRadius={4}
      overflow="hidden">
      <Box p={2}>
        <Typography variant="h4">{`${plan.interval_months} Month`}</Typography>
        {discount && (
          <Box display="flex" alignItems="flex-end" justifyContent="center">
            <Box style={{ textDecoration: 'line-through' }}>
              <Typography
                variant="h6"
                style={{
                  fontWeight: 700
                  // color: green[500]
                }}>
                ₹ {monthlyPrice}
              </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary">
              /month
            </Typography>
          </Box>
        )}

        <Box display="flex" alignItems="flex-end" justifyContent="center">
          <Typography
            variant="h5"
            style={{
              fontWeight: 700,
              color: green[500]
            }}>
            ₹ {Math.round(finalPrice / plan.interval_months)}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            /month
          </Typography>
        </Box>

        <Typography variant="subtitle2" color="textSecondary">
          {cycleMap[plan.interval_months]}
        </Typography>
      </Box>

      {/* <Divider /> */}

      <Box p={2}>
        {btnText && (
          <LoadingButton
            variant="contained"
            color="primary"
            fullWidth
            size="medium"
            onClick={subscribeToPlan}
            isLoading={loading}
            // disabled={isSubscribed}
            btnText={btnText}
            // btnText={'Select Plan'}
          />
        )}
        {isSubscribed && (
          <Typography variant="caption">Current Plan</Typography>
        )}
      </Box>
    </Box>
  )
}

export default SinglePlanView
