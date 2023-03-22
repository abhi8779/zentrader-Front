import api from '@/services/trader'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'

const positionEntity = new schema.Entity('orders')

const getPositions = createAsyncThunk(
  'positions/get',
  async (params, { rejectWithValue }) => {
    try {
      const resp = await api.OptionSell.Position.get({
        expand:
          'derivative.expiry,derivative.instrument,target_order,stoploss_order',
        limit: 1000,
        ...params
      })
      const normalized = normalize(resp.data.results, [positionEntity])
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

const deletePosition = createAsyncThunk(
  'positions/delete',
  async (posId, { rejectWithValue, dispatch }) => {
    try {
      await api.OptionSell.Position.delete(posId)
      dispatch(getPositions())
    } catch (e) {
      console.error(e)
      rejectWithValue(e.data)
    }
  }
)

const positionSlice = createSlice({
  name: 'positions',
  initialState: {
    data: null,
    isLoading: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPositions.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getPositions.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.data = payload
    })
    builder.addCase(getPositions.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
  }
})

export { getPositions, deletePosition }
export default positionSlice.reducer
