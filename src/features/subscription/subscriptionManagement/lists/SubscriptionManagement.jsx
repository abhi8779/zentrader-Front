import EmptyListMessage from '@/components/EmptyListMessage'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import SubscriptionManagementItem from './components/SubscriptionManagementItem'

const SubscriptionManagement = () => {
  const subscriptions = useSelector((s) => s.subscriptions.subscriptions)

  return (
    <>
      <Box px={2} pt={2}>
        <Typography variant="h5" style={{ fontWeight: 700 }}>
          Subscriptions
        </Typography>
      </Box>
      {subscriptions?.map((sub) => (
        <SubscriptionManagementItem key={sub.id} sub={sub} />
      ))}
      {!subscriptions.length && (
        <EmptyListMessage text={`No Subscriptions available!`} />
      )}
    </>
  )
}

export default SubscriptionManagement
