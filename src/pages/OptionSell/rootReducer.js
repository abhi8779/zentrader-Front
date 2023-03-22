import { combineReducers } from '@reduxjs/toolkit'
import cartSlice from './Cart/cartSlice'
import orderSlice from './Orders/orderSlice'
import positionSlice from './Positions/positionSlice'
import strikeMeasureSlice from './StrikeMeasures/strikeMeasureSlice'

const rootReducer = combineReducers({
  strikeMeasures: strikeMeasureSlice,
  orders: orderSlice,
  positions: positionSlice,
  cart: cartSlice
})

export default rootReducer
