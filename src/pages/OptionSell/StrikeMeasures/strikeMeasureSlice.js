import { createSlice } from '@reduxjs/toolkit'

const marketdataSlice = createSlice({
  name: 'strikeMeasure',
  initialState: {
    filters: {}
  },
  reducers: {
    updateFilters: (state, { payload }) => {
      state.filters[payload.key] = payload.value
    },
    clearFilters: (state) => {
      state.filters = {}
    }
  },
  extraReducers: (builder) => {}
})

export const { updateFilters } = marketdataSlice.actions
export default marketdataSlice.reducer
