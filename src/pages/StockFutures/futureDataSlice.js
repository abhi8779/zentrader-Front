import { getFutureData } from '@/services/stockfutures'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'

const futureDataEntity = new schema.Entity('futureDataEntity')

const fetchFuturData = createAsyncThunk(
  'futureData/get',
  async (params, { rejectWithValue, getState }) => {
    const state = getState()
    try {
      const resp = await getFutureData({
        expand: 'derivative.expiry,derivative.instrument',
        limit: 1000,
        ...state.stockFutures.futureData.filters,
        ...params
      })
      const normalized = normalize(resp.data.results, [futureDataEntity])
      return {
        normalized: normalized,
        original: resp.data.results,
        params
      }
    } catch (e) {
      console.error(e)
      rejectWithValue(e.data)
    }
  }
)

const updateFiltersAndGetFutureData = createAsyncThunk(
  'strikemeasure/updatefilter',
  async ({ key, value }, { dispatch }) => {
    dispatch(futureDataSlice.actions.updateFilters({ key, value }))
    dispatch(fetchFuturData())
  }
)

const futureDataSlice = createSlice({
  name: 'strikemeasure',
  initialState: {
    data: {},
    filters: {},
    isLoading: true
  },
  reducers: {
    updateFilters: (state, { payload }) => {
      state.filters[payload.key] = payload.value
    },
    clearFilters: (state) => {
      state.filters = {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFuturData.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(
      fetchFuturData.fulfilled,
      (state, { payload: { normalized, original, params } }) => {
        state.isLoading = false
        state.data.normalized = normalized
        state.data.original = original
        state.params = params
      }
    )

    builder.addCase(fetchFuturData.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
  }
})

export { fetchFuturData, updateFiltersAndGetFutureData, futureDataEntity }
export default futureDataSlice.reducer
