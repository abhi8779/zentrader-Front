import AvailableComplimentarySubs from '@/components/AvailableComplimentarySubs'
import api from '@/services/trader'
import theme from '@/theme'
import capitalizeString from '@/utils/capitalizeString'
import { Box, Typography, useMediaQuery } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MobileMultiPlanView from './MobileMultiPlanView'
import MultiPlanView from './MultiPlanView'

const SubscribeView = ({ planGroup, title, onSubscribeSuccess }) => {
  const [discount, setDiscount] = useState(null)
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const redirectUrl = {
    ath: '/ath/list/',
    alerts: '/plans/alerts/'
  }
  const subscription = useSelector((s) => {
    let subs = s.subscriptions.subscriptions
    if (!subs) {
      return null
    }
    subs = subs.filter((s) => s.plan.plan_group.tag === planGroup)
    return subs.length ? subs[0] : null
  })

  useEffect(() => {
    getDiscounts()
  }, [])

  const getDiscounts = async () => {
    const discs = await api.Subscription.Discount.getForUser({
      planGroup
    })
    if (discs?.data) {
      setDiscount(discs?.data?.length ? discs.data[0] : null)
    }
  }

  return (
    <Box display={'flex'} flexDirection="column">
      <DiscountAlert discount={discount} />

      <SubscriptionExpiredOrCancelled
        subscription={subscription}
        planGroup={planGroup}
      />

      <Box mt={2} mb={0}>
        <Typography align="center" variant="h5" style={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Box>

      {!subscription && <NotSubscribedText planGroup={planGroup} />}

      <Box mt={2} mb={2}>
        <AvailableComplimentarySubs
          planGroup={planGroup}
          onSubscribeSuccess={onSubscribeSuccess}
        />
      </Box>

      <Box ml={2} mr={2} mb={2}>
        {smallScreen ? (
          <MobileMultiPlanView
            onSubscribeSuccess={onSubscribeSuccess}
            planGroup={planGroup}
            redirectUrl={redirectUrl[planGroup]}
            subscription={subscription}
            discount={discount}
          />
        ) : (
          <MultiPlanView
            onSubscribeSuccess={onSubscribeSuccess}
            planGroup={planGroup}
            redirectUrl={redirectUrl[planGroup]}
            subscription={subscription}
            discount={discount}
          />
        )}
      </Box>
    </Box>
  )
}

const SubscriptionExpiredOrCancelled = ({ subscription, planGroup }) => {
  return (
    subscription && (
      <>
        {subscription.status === 'expired' && (
          <Alert severity="error">
            {subscription.trial ? (
              <Typography>
                Your trial period for <b>{capitalizeString(planGroup)}</b> has
                expired. Please subscribe using a plan below{' '}
              </Typography>
            ) : (
              <Typography>
                Your subscription for <b>{capitalizeString(planGroup)}</b> has
                expired, please subscribe to one of the plans below
              </Typography>
            )}
          </Alert>
        )}
        {subscription.status === 'cancelled' && !subscription.plan?.trial && (
          <Alert severity="error">
            <Typography>
              Your subscription for <b>{capitalizeString(planGroup)}</b> has
              been cancelled, please subscribe using one of the plans below
            </Typography>
          </Alert>
        )}
      </>
    )
  )
}

const DiscountAlert = ({ discount }) => {
  return (
    discount && (
      <Alert
        severity="success"
        style={{ display: 'flex', justifyContent: 'center' }}>
        <strong>{/* {discount.title} - {discount.percentage}% */}</strong>{' '}
        discount has been applied
      </Alert>
    )
  )
}

const NotSubscribedText = ({ planGroup }) => {
  return (
    <Typography style={{ padding: theme.spacing(2) }}>
      You currently do not have an active subscription to the{' '}
      <b>{capitalizeString(planGroup)}</b> feature. Please choose one of the
      plans below to continue
    </Typography>
  )
}

export default SubscribeView
