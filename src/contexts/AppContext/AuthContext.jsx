import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router-dom'
import AppContext from './AppContext'

const AuthContext = React.createContext()

function AuthContextProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = React.useState(null)
  const [tokens, setTokens] = React.useState(null)
  const history = useHistory()
  const { isLoading, setLoading } = React.useContext(AppContext)

  React.useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if (accessToken && refreshToken) {
      try {
        setTokens({
          accessToken,
          refreshToken
        })
        setLoggedIn(true)
      } catch (e) {
        setLoggedIn(false)
      }
    } else {
      setLoggedIn(false)
    }

    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const resp = await axios.post('/api/token/', {
        email: email,
        password: password
      })
      setTokens(resp.data)
      localStorage.setItem('accessToken', resp.data.access)
      localStorage.setItem('refreshToken', resp.data.refresh)
      setLoggedIn(true)
    } catch (e) {}
  }

  const logout = () => {
    setTokens(null)
    setLoggedIn(false)
    localStorage.clear()
    history.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        tokens,
        isLoading,
        login,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
export { AuthContextProvider }
