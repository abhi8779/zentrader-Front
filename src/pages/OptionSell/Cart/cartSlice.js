import api from '@/services/trader'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const createOrdersFromCart = createAsyncThunk(
  'cart/create_order',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState()
      const cartItems = state.optionSell.cart.items
      await api.OptionSell.StrikeMeasure.createBulkOrders(
        getOrderPayload(cartItems)
      )
    } catch (e) {
      console.error(e)
      rejectWithValue(e)
    }
  }
)

const getOrderPayload = (cartItems) => {
  const payload = []
  for (const key in cartItems) {
    const cItem = cartItems[key]
    payload.push({
      strike: cItem.strikeMeasure,
      quantity: cItem.quantity
    })
  }
  return payload
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {}
  },
  reducers: {
    addItem: (state, { strikeMeasure, quantity }) => {
      state.items[strikeMeasure.Id] = {
        quantity: quantity,
        strikeMeasure: strikeMeasure.id
      }
    },
    removeItem: (state, strikeMeasureId) => {
      delete state.items[strikeMeasureId]
    },
    clearItems: (state) => {
      state.items = {}
    },
    updateItemQuantity: (state, { payload }) => {
      if (payload.quantity === 0) {
        delete state.items[payload.strikeMeasureId]
      } else {
        state.items[payload.strikeMeasureId] = {
          quantity: payload.quantity,
          strikeMeasure: payload.strikeMeasureId
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrdersFromCart.pending, (state) => {
      state.isCreatingOrder = true
    })
    builder.addCase(createOrdersFromCart.fulfilled, (state, { payload }) => {
      state.isCreatingOrder = false
      state.orderPayload = payload
      state.items = {}
    })
    builder.addCase(createOrdersFromCart.rejected, (state, error) => {
      state.isCreatingOrder = false
      state.orderCreateError = error
    })
  }
})

// Actions
export const {
  addItem,
  removeItem,
  clearItems,
  updateItemQuantity
} = cartSlice.actions
export { createOrdersFromCart }
// Reducer
export default cartSlice.reducer
