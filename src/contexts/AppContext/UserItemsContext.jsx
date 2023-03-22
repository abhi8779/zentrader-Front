import React from 'react'
import api from '../../services/trader'
import AuthContext from './AuthContext'

const UserItemsContext = React.createContext({})

const UserItemsContextProvider = ({ children }) => {
  const [orders, setOrders] = React.useState(null)
  const [positions, setPositions] = React.useState(null)
  const { isLoggedIn } = React.useContext(AuthContext)

  React.useEffect(() => {
    getInitialData()
  }, [isLoggedIn])

  const getInitialData = async () => {
    await Promise.all([getOrders(), getPositions()])
  }

  const getOrders = async () => {
    try {
      const resp = await api.Order.Order.get({
        expand: 'derivative.expiry,derivative.instrument'
      })
      setOrders(resp.data.results)
    } catch (e) {
      console.error(e)
    }
  }

  const getPositions = async () => {
    try {
      const resp = await api.Position.Position.get({
        expand: 'derivative.expiry'
      })
      setPositions(resp.data.results)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <UserItemsContext.Provider
      value={{
        orders,
        positions,
        getOrders,
        getPositions
      }}>
      {children}
    </UserItemsContext.Provider>
  )
}

export default UserItemsContext
export { UserItemsContextProvider }
