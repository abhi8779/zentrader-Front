import { zentraderApi } from '@/services/baseApi'

const marketDataApi = zentraderApi.injectEndpoints({
  endpoints: (build) => ({
    getExpirires: build.query({
      query: (params) => ({
        url: 'marketdata/expiry/',
        method: 'GET',
        params: {
          ...params,
          limit: 5
        }
      })
    }),
    getInstruments: build.query({
      query: (params) => ({
        url: 'marketdata/instrument/',
        method: 'GET',
        params
      })
    })
  }),
  overrideExisting: false
})

export const { useGetExpiriresQuery, useGetInstrumentsQuery } = marketDataApi
