import { useSelector } from 'react-redux'

const useSubscription = () => {
  const isLoading = useSelector((s) => s.subscriptions.isLoading)
  const subscriptions = useSelector((s) => s.subscriptions.subscriptions)
  const getSubscription = (planGroup) => {
    if (!isLoading) {
      return subscriptions?.filter(
        (s) => s.plan.plan_group.tag === planGroup
      )[0]
    }
  }

  return { getSubscription }
}

export { useSubscription }
