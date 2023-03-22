import { zentraderApi } from './baseApi'

const stockFutureApi = zentraderApi.injectEndpoints({
  endpoints: (build) => ({
    futureData: build.query({
      query: (params) => ({
        url: 'stockfutures/futuredata/',
        method: 'GET',
        params
      })
    })
  }),
  overrideExisting: false
})

export const { useFutureDataQuery } = stockFutureApi
