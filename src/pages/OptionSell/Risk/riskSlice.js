import api from '@/services/trader'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const getPositions = createAsyncThunk(
  'posotions/get',
  async (params, { rejectWithValue }) => {
    try {
      const resp = await api.OptionSell.StrikeMeasure.get({
        expand: 'derivative.expiry,derivative.instrument',
        limit: 1000,
        ...params
      })
      return { data: resp.data.results, params }
    } catch (e) {
      console.error(e)
      rejectWithValue(e.data)
    }
  }
)

const positionSlice = createSlice({
  name: 'risk',
  initialState: {
    totalRisk: 0,
    cartRisk: 0,
    orderRisk: 0,
    positionRisk: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPositions.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getPositions.fulfilled,
      (state, { payload: { data, params } }) => {
        state.isLoading = false
        state.data = data
        state.params = params
      }
    )
    builder.addCase(getPositions.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
  }
})

export { getPositions }
export default positionSlice.reducer
