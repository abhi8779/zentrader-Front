import ErrorMessage from '@/components/ErrorMessage'
import LabelValue from '@/components/LabelValue'
import PaddedProgressBar from '@/components/PaddedProgressBar'
import { useConfirmationDialog } from '@/contexts/ConfirmContext'
import { useActivateSubscriptionDialog } from '@/features/subscription/subscriptionManagement/dialogs/ActivateSubscriptionDialog'
import { useSubscription } from '@/features/subscription/subscriptionManagement/hooks/useSubscriptionHook'

import ZenApi from '@/services/trader'
import theme from '@/theme'
import { Box, Button, Typography } from '@material-ui/core'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

const AvailableComplimentarySubs = ({ planGroup, onSubscribeSuccess }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [compSubs, setCompSubs] = useState()
  const [isError, setIsError] = useState()
  const { getSubscription } = useSubscription()
  const currentSubscription = getSubscription(planGroup)

  useEffect(() => {
    getAllComplimentarySubs()
  }, [])

  const getAllComplimentarySubs = async () => {
    try {
      setIsLoading(true)
      const res = await ZenApi.Subscription.UserComplimentarySubs.get({
        expand: 'plan,plan_group,comp_sub'
      })

      setCompSubs(filterCompSubs(res.data.results))
    } catch (e) {
      console.error(e)
      setIsError(e)
    } finally {
      setIsLoading(false)
    }
  }

  const filterCompSubs = (items) => {
    return items.filter(
      (item) =>
        item.plan_group.tag === planGroup &&
        item.status === 'unclaimed' &&
        (!currentSubscription ||
          currentSubscription.status !== 'active' ||
          item.plan.order > currentSubscription?.plan?.order)
    )
  }

  if (isLoading) {
    return <PaddedProgressBar />
  }
  if (isError) {
    return <ErrorMessage />
  }

  return (
    <>
      {compSubs?.map((sub) => (
        <AvailableComplimentarySubItem
          planGroup={planGroup}
          onSuccess={(id) => {
            setCompSubs((prevVal) => prevVal.filter((val) => val.id !== id))
            onSubscribeSuccess && onSubscribeSuccess()
          }}
          key={sub.id}
          sub={sub}
        />
      ))}
    </>
  )
}

const AvailableComplimentarySubItem = ({ sub, onSuccess, planGroup }) => {
  const { getConfirmation } = useConfirmationDialog()
  const { showActivateSubscriptionDialog } = useActivateSubscriptionDialog()

  return (
    <Box>
      <Box
        bgcolor={theme.palette.primary.light}
        color="#fff"
        p={2}
        display={'flex'}
        alignItems="start">
        <Box mr={2}>
          <Typography variant="body1">
            You have a complimentary {sub.duration_days} day subscription for{' '}
            <strong>
              {sub.plan_group.name} - {sub.plan.name}
            </strong>{' '}
            avaliable.
            {sub.valid_till &&
              ` Claim it before ${moment(sub.valid_till).format(
                'MMMM Do YYYY'
              )}`}
          </Typography>
        </Box>
        <Button
          style={{
            marginLeft: 'auto',
            whiteSpace: 'nowrap',
            minWidth: 'auto'
          }}
          size="small"
          onClick={async () => {
            if (
              await getConfirmation({
                title: `Activate Subscription`,
                message: <ComplimentarySubConfirmPreview sub={sub} />,
                btnConfirmText: 'Activate'
              })
            ) {
              showActivateSubscriptionDialog(planGroup, sub.id)
              onSuccess(sub.id)
            }
          }}
          variant="contained"
          // color="tertiary"
        >
          Activate Now
        </Button>
      </Box>
    </Box>
  )
}

function ComplimentarySubConfirmPreview({ sub }) {
  return (
    <Box>
      <Box display={'flex'} gridGap={18}>
        <LabelValue
          label={'Plan Name'}
          value={`${sub.plan_group.name} - ${sub.plan.name}`}
        />

        <LabelValue
          label={'Plan Duration'}
          value={`${sub.duration_days} days*`}
        />

        {sub.valid_till && (
          <LabelValue
            label={'Valid Till'}
            value={`${moment(sub.valid_till).format('MMMM Do YYYY')} days`}
          />
        )}
      </Box>
    </Box>
  )
}

export default AvailableComplimentarySubs
