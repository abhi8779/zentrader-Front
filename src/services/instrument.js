import { zentraderApi } from '@/services/baseApi'

const instrumentApi = zentraderApi.injectEndpoints({
  endpoints: (build) => ({
    getInstruments: build.query({})
  }),
  overrideExisting: false
})

export const { useGetExpiriresQuery } = instrumentApi
