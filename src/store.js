import userReducer from '@/features/accounts/slices/userSlice'
import optionSellReducer from '@/pages/OptionSell/rootReducer'
import instance, { configureApi } from '@/services/api'
import { zentraderApi } from '@/services/baseApi'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistStore } from 'redux-persist'
import alertSlice from './features/alerts/slices/alertSlice'
import athReducer from './features/ath/slices/athSlice'
import subscriptionSlice from './features/subscription/subscriptionManagement/slices/subscriptionSlice'

const rootReducer = combineReducers({
  alert: alertSlice,
  ath: athReducer,
  optionSell: optionSellReducer,
  user: userReducer,
  subscriptions: subscriptionSlice,
  [zentraderApi.reducerPath]: zentraderApi.reducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      zentraderApi.middleware
    ),
  devTools: true
})

const persistor = persistStore(store)

configureApi(instance, store)

export { store, persistor }
