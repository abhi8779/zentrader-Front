import React from 'react'
import AppContext, { AppContextProvider } from './AppContext'
import AuthContext, { AuthContextProvider } from './AuthContext'
import CartContext, { CartContextProvider } from './CartContext'
import MarketDataContext, {
  MarketWatchContextProvider
} from './MarketWatchContext'
import RiskContext, { RiskContextProvider } from './RiskContext'
import UserItemsContext, { UserItemsContextProvider } from './UserItemsContext'

function conbineComponents(components) {
  return components.reduce((AccumulatedComponents, CurrentComponent) => {
    return ({ children }) => (
      <AccumulatedComponents>
        <CurrentComponent>{children}</CurrentComponent>
      </AccumulatedComponents>
    )
  })
}

export default conbineComponents([
  AppContextProvider,
  AuthContextProvider,
  UserItemsContextProvider,
  CartContextProvider,
  MarketWatchContextProvider,
  RiskContextProvider
])

export {
  AppContext,
  AuthContext,
  CartContext,
  MarketDataContext,
  RiskContext,
  UserItemsContext
}
