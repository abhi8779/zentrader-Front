import { InstrumentSearchContextProvider } from '@/features/alerts/contexts/InstrumentSearchContext'
import React from 'react'
import DerivativeSelection from './DerivativeSelection'
import ExchangeSelect from './ExchangeSelect'
import InstrumentSearchField from './InstrumentSearchField'

const InstrumentSearch = ({
  label,
  setLtp,
  instrumentToPop,
  ltpToPop,
  resetForm,
  onSelect,
  onTriggerValueChange,
  value,
  onError,
  ...props
}) => {
  return (
    <InstrumentSearchContextProvider
      label={label}
      setLtp={setLtp}
      instrumentToPop={instrumentToPop}
      ltpToPop={ltpToPop}
      resetForm={resetForm}
      onSelect={onSelect}
      onTriggerValueChange={onTriggerValueChange}
      value={value}
      {...props}>
      <ExchangeSelect />
      <InstrumentSearchField onError={onError} />
      <DerivativeSelection />
    </InstrumentSearchContextProvider>
  )
}

export default InstrumentSearch
