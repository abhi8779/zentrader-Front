import api from './api'

export const getFutureData = async (params) => {
  return api.get('/stockfutures/futuredata/', { params })
}
