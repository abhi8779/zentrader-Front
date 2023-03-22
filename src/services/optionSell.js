import { zentraderApi } from '@/services/baseApi'

const optionSellApi = zentraderApi.injectEndpoints({
  endpoints: (builder) => ({
    getStrikes: builder.query({
      query: (params) => ({
        url: 'optionsell/strike/',
        method: 'GET',
        params: { expand: 'derivative.instrument,derivative.expiry', ...params }
      }),
      transformResponse: (d) => d.results
    })
  }),
  overrideExisting: false
})

export const { useGetStrikesQuery } = optionSellApi
