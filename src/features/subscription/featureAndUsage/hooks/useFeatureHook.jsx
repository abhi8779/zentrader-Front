import { useSelector } from 'react-redux'

const useFeature = () => {
  const isLoading = useSelector((s) => s.subscriptions.isLoading)
  const features = useSelector((s) => s.subscriptions.features)

  const getFeature = (featureName) => {
    if (!isLoading) {
      return features?.filter((f) => f.feature === featureName)[0]
    }
  }

  return { getFeature }
}

export { useFeature }
