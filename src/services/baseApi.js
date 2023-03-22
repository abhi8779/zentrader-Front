import { createApi } from '@reduxjs/toolkit/query/react'
import api from './api'

const axiosBaseQuery = ({ baseUrl }) => async ({
  url,
  method,
  data,
  params
}) => {
  try {
    const result = await api({ url: baseUrl + url, method, data, params })
    return { data: result.data }
  } catch (axiosError) {
    const err = axiosError
    return {
      error: { status: err.response?.status, data: err.response?.data }
    }
  }
}

export const zentraderApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: '/'
  }),
  endpoints: (build) => ({})
})
