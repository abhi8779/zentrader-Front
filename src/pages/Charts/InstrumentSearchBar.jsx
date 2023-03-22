import theme from '@/theme'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery
} from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import InstrumentSearchContext, {
  InstrumentSearchContextProvider
} from '../../features/alerts/contexts/InstrumentSearchContext'
import DerivativeSelection from '../../features/alerts/fields/DerivativeSelection'
import InstrumentSearchField from '../../features/alerts/fields/InstrumentSearchField'

const InstrumentSearchBar = ({ onChange, setContinuous }) => {
  const [value, setValue] = useState(null)
  const [cont, setCont] = useState(false)
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    onChange && onChange(value)
  }, [value])

  useEffect(() => {
    setContinuous && setContinuous(cont)
  }, [cont])

  return (
    <>
      <InstrumentSearchContextProvider
        label={'Instrument'}
        resetForm={() => {}}
        onSelect={(v) => {
          setValue(v)
        }}
        value={value}>
        <Box
          width={'100%'}
          display={'flex'}
          flexDirection={extraSmallScreen ? 'column' : 'row'}
          style={{ gap: theme.spacing(2) }}>
          <ExchangeSelect />
          <InstrumentSearchField />
          <DerivativeSelection useSelectStyleTypeInput />
          {value?.type === 'FUT' && (
            <Box ml={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={cont}
                    onChange={(e) => {
                      setCont(e.target.checked)
                    }}
                    name="Continuous"
                  />
                }
                label="Continuous"
              />
            </Box>
          )}
        </Box>
      </InstrumentSearchContextProvider>
    </>
  )
}

const ExchangeSelect = () => {
  const { exchange, setExchange } = useContext(InstrumentSearchContext)
  const options = ['NSE', 'BSE', 'NFO', 'MCX']
  return (
    <FormControl variant="outlined" size="small">
      <InputLabel shrink>Exchange</InputLabel>
      <Select
        value={exchange}
        onChange={(e) => {
          setExchange(e.target.value)
        }}
        label="Exchange"
        displayEmpty>
        {options.map((x) => (
          <MenuItem value={x} key={x}>
            {x}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default InstrumentSearchBar
