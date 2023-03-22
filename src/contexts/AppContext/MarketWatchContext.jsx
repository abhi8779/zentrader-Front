import React from 'react'
import api from '../../services/trader'
import AuthContext from './AuthContext'

const MarketWatchContext = React.createContext({})

function MarketWatchContextProvider({ children }) {
  const [selectedInstrument, setSelectedInstrument] = React.useState(null) // const [instrument, setInstrument] = React.useState(null);
  const [strikes, setStrikes] = React.useState(null)
  const [expiries, setExpiries] = React.useState(null)
  const [instruments, setInstruments] = React.useState(null)
  const [filters, setFilters] = React.useState({
    type: 'weekly',
    strike__type: 'PE',
    qualifying: true
  })
  const { isLoggedIn } = React.useContext(AuthContext)

  React.useEffect(() => {
    getStrikes(filters)
  }, [filters, isLoggedIn])

  React.useEffect(() => {
    getInitialData()
  }, [isLoggedIn])

  const getInitialData = async () => {
    await Promise.all([getInstruments(), getExpiries()])
  }

  const getInstruments = async () => {
    try {
      const resp = await api.MarketData.Instrument.get()
      setInstruments(resp.data.results)
    } catch (e) {
      console.error(e)
    }
  }

  const getExpiries = async () => {
    try {
      const resp = await api.MarketData.Expiry.get()
      setExpiries(resp.data.results)
    } catch (e) {
      console.error(e)
    }
  }

  const getStrikes = async (params) => {
    try {
      const resp = await api.OptionSell.StrikeMeasure.get({
        expand: 'derivative.expiry,derivative.instrument',
        limit: 1000,
        ...params
      })
      setStrikes(resp.data.results)
    } catch (e) {
      console.error(e)
    }
  }

  const updateFilter = (filter) => {
    setFilters({
      ...filters,
      ...filter
    })
  }

  return (
    <MarketWatchContext.Provider
      value={{
        strikes,
        getStrikes,
        filters,
        updateFilter,
        instruments,
        expiries,
        setInstruments,
        selectedInstrument,
        setSelectedInstrument
      }}>
      {children}
    </MarketWatchContext.Provider>
  )
}

export default MarketWatchContext
export { MarketWatchContextProvider }
