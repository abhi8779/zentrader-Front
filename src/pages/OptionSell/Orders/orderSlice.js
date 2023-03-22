import api from '@/services/trader'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'

const orderEntity = new schema.Entity('orders')

const getOrders = createAsyncThunk(
  'orders/get',
  async (params, { rejectWithValue }) => {
    try {
      const resp = await api.OptionSell.Order.get({
        expand:
          'derivative.expiry,derivative.instrument,entry_order,target_order,stoploss_order',
        status: 'active',
        limit: 1000,
        ...params
      })
      const normalized = normalize(resp.data.results, [orderEntity])
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

const deleteOrder = createAsyncThunk(
  'orders/delete',
  async (orderId, { rejectWithValue, dispatch }) => {
    try {
      const resp = await api.OptionSell.Order.delete(orderId)
      dispatch(getOrders())
      return resp.data
    } catch (e) {
      console.error(e)
      rejectWithValue(e.data)
    }
  }
)
const triggerOrder = createAsyncThunk(
  'orders/delete',
  async (orderId, { rejectWithValue, dispatch }) => {
    try {
      const resp = await api.OptionSell.Order.trigger(orderId)
      dispatch(getOrders())
      return resp.data
    } catch (e) {
      console.error(e)
      rejectWithValue(e.data)
    }
  }
)

const orderDataSlice = createSlice({
  name: 'orders',
  initialState: {
    data: null,
    isLoading: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.data = payload
    })
    builder.addCase(getOrders.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })

    builder.addCase(deleteOrder.pending, (state, error) => {
      state.isLoading = false
      state.error = error
    })
    builder.addCase(deleteOrder.fulfilled, (state, error) => {
      state.isLoading = false
      state.error = error
    })
    builder.addCase(deleteOrder.rejected, (state, error) => {
      state.isLoading = false
      state.error = error
    })
  }
})

export { getOrders, deleteOrder, triggerOrder }
export default orderDataSlice.reducer
