import api from '@/services/trader'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const getAthResults = createAsyncThunk(
  'athList/get',
  async ({ filters = {} }, { rejectWithValue }) => {
    try {
      const res = await api.Ath.Results.get({
        ...filters,
        version: filters.version !== 'all' ? filters.version : null
      })
      return {
        results: res.data.results,
        count: res.data.count,
        version: filters.version
      }
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

const athListSlice = createSlice({
  name: 'athList',
  initialState: {
    data: null,
    counts: null,
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAthResults.pending, (state) => {
      state.isLoading = true
      state.fetchError = null
    })

    builder.addCase(
      getAthResults.fulfilled,
      (state, { payload: { results, count } }) => {
        state.data = results
        state.counts = count
        state.isLoading = false
      }
    )
    builder.addCase(getAthResults.rejected, (state, error) => {
      state.isLoading = false
      state.fetchError = error
    })
  }
})

// Actions
export { getAthResults }

// Reducer
export default athListSlice.reducer
