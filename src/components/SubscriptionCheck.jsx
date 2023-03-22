import { useSubscription } from '@/features/subscription/subscriptionManagement/hooks/useSubscriptionHook'
import { useSelector } from 'react-redux'

const SubscriptionCheck = ({
  planGroup,
  isSubscribedComponent,
  notSubscribedComponent
}) => {
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const isLoading = useSelector((s) => s.subscriptions.isLoading)
  const { getSubscription } = useSubscription()
  const subscription = getSubscription(planGroup)
  const isActiveSubscription = () => {
    return subscription && subscription.status === 'active'
  }

  return !isLoading && isLoggedIn && !isActiveSubscription()
    ? notSubscribedComponent
    : isSubscribedComponent
}

export default SubscriptionCheck
