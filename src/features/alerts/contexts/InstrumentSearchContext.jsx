import api from '@/services/trader'
import { debounce } from 'lodash'
import React, { useEffect, useState } from 'react'

const InstrumentSearchContext = React.createContext()

const InstrumentSearchContextProvider = ({
  label,
  children,
  instrumentToPop,
  ltpToPop,
  setLtp = () => {},
  resetForm = () => {},
  onSelect = () => {},
  onTriggerValueChange = () => {},
  value,
  ...props
}) => {
  const EXCHANGES_WITH_DERIVATIVES = ['NFO', 'MCX']

  const [loadingInstruments, setLoadingInstruments] = useState()
  const [exchange, setExchange] = useState('NSE')
  const [instruments, setInstruments] = useState([])
  const [loadingDetails, setLoadingDetails] = useState()
  const [instrumentDetails, setInstrumentDetails] = useState()
  const [selectedInstrument, setSelectedInstrument] = useState(false)
  const [instrumentType, setInstrumentType] = React.useState('FUT')
  const [hasDerivatives, setHasDerivatives] = React.useState(false)
  const [hasOptions, setHasOptions] = React.useState(false)
  const [expiries, setExpiries] = useState(null)
  const [futures, setFutures] = useState(null)
  const [options, setOptions] = useState(null)
  const [error, setError] = useState(null)

  // Formik stuff
  // const [, {  }, { setValue }] = useField(props)
  // const { setFieldValue } = useFormikContext()

  useEffect(() => {
    // Check if showing derivatives is needed
    if (
      EXCHANGES_WITH_DERIVATIVES.includes(exchange) &&
      (selectedInstrument?.has_options || selectedInstrument?.has_futures)
    ) {
      // Show the derivatives UI
      setHasDerivatives(true)

      // Has Options check to disable call & put btn
      selectedInstrument?.has_options
        ? setHasOptions(true)
        : setHasOptions(false)
    } else {
      // Hide derivative UI
      setHasDerivatives(false)
      // Select the final value
      if (selectedInstrument) {
        setFormikValue(selectedInstrument)
      }
    }
  }, [selectedInstrument, exchange])

  // When exchange changes, clear all inputs and clear formik value
  useEffect(() => {
    if (!(instrumentToPop?.exchange === exchange)) {
      clearInputs()
    }
    onSelect(null)
  }, [exchange])

  useEffect(() => {
    if (instrumentToPop && typeof instrumentToPop === 'object') {
      populateInstrument(instrumentToPop)
    }
  }, [instrumentToPop])

  // When value changes externally
  useEffect(() => {
    // If value is an object, it must have been set externally. We need to populate the value to the inputs
    if (!value && !instrumentToPop) {
      clearInputs()
      resetForm()
    }
  }, [value])

  const populateInstrument = (instrument) => {
    // Check exchange first
    setExchange(instrument.exchange)
    if (EXCHANGES_WITH_DERIVATIVES.includes(instrument.exchange)) {
      if (instrument.underlying) {
        setInstruments([instrument.underlying])
        setSelectedInstrument(instrument.underlying)
        setInstrumentType(instrument.type)
      } else {
        setInstruments([instrument])
        setSelectedInstrument(instrument)
      }
      setHasDerivatives(true)
    } else {
      setInstruments([instrument])
      setSelectedInstrument(instrument)
      onSelect(instrument)
    }
  }

  const setFormikValue = (instrument) => {
    // This is meant to set the final value and LTP
    onSelect(instrument)

    if (instrumentToPop?.id !== instrument.id) {
      setLtp(instrument.last_price)
      // setFieldValue('trigger_value', instrument.last_price)
      onTriggerValueChange(instrument.last_price)
    } else {
      setLtp(instrumentToPop.last_price)
    }
  }

  const getInstrumentsDelayed = React.useCallback(
    debounce(
      async (search) => {
        try {
          setLoadingInstruments(true)
          const res = await api.MarketData.Instrument.get({
            search,
            limit: 30,
            exchange: exchange === 'NFO' ? 'NSE' : exchange,
            with_derivatives: exchange === 'NFO',
            underlying__isnull: true
          })
          setLoadingInstruments(false)
          setInstruments(res.data.results)
          setError(null)
        } catch (e) {
          setError(e.response)
          setLoadingInstruments(false)
        }
      },
      1000,
      { maxWait: 5000 }
    ),
    [exchange]
  )

  const getInstruments = async (search) => {
    getInstrumentsDelayed.cancel()
    if (!search) {
      setInstruments([])
    } else {
      getInstrumentsDelayed(search)
    }
  }

  const getInstrumentDetailsDelayed = React.useCallback(
    debounce(
      async (id) => {
        setLoadingDetails(true)
        const res = await api.MarketData.Instrument.getDetails(id)
        setInstrumentDetails(res.data)
        setLoadingDetails(false)
      },
      0,
      { maxWait: 0 }
    ),
    []
  )

  const getInstrumentDetails = async (id) => {
    getInstrumentDetailsDelayed.cancel()
    getInstrumentDetailsDelayed(id)
  }

  const clearInputs = () => {
    setLtp(0)
    onSelect(null)
    setSelectedInstrument(null)
    setInstrumentDetails(null)
    setInstruments([])
    setExpiries(null)
    setOptions(null)
    setFutures(null)
  }

  const getOptions = async (type, expiry) => {
    const res = await api.MarketData.Instrument.getOptions(
      selectedInstrument.id,
      type,
      expiry
    )
    setOptions(res.data.results)
  }

  const getFutures = async () => {
    const res = await api.MarketData.Instrument.getFutures(
      selectedInstrument.id
    )
    setFutures(res.data.results)
  }

  const getExpiries = async (type) => {
    const res = await api.MarketData.Instrument.getExpiries(
      selectedInstrument.id,
      type
    )
    setExpiries(res.data)
  }

  return (
    <InstrumentSearchContext.Provider
      value={{
        label,
        setLtp,
        value,
        setFormikValue,
        EXCHANGES_WITH_DERIVATIVES,

        // Currently selected exchange
        exchange,
        setExchange,

        // List of instruments
        loadingInstruments,
        instruments,
        getInstruments,
        setInstruments,

        // Details for instrument
        loadingDetails,
        instrumentDetails,
        getInstrumentDetails,

        // Currently active instrument
        selectedInstrument,
        setSelectedInstrument,

        // Instrument type like FUT, CE, PE
        instrumentType,
        setInstrumentType,

        hasDerivatives,

        hasOptions,

        expiries,
        getExpiries,

        futures,
        getFutures,

        options,
        getOptions,

        instrumentToPop,

        clearInputs,
        error
      }}>
      {children}
    </InstrumentSearchContext.Provider>
  )
}

export default InstrumentSearchContext
export { InstrumentSearchContextProvider }
