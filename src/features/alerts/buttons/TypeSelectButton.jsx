// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import React, { useContext } from 'react'

import InstrumentSearchContext from '../contexts/InstrumentSearchContext'

const TypeSelectButton = () => {
  const { instrumentType, setInstrumentType, hasOptions } = useContext(
    InstrumentSearchContext
  )

  const options = [
    {
      type: 'FUT',
      label: 'Future',
      show: true
    },
    hasOptions && {
      type: 'CE',
      label: 'Call',
      show: true
    },
    hasOptions && {
      type: 'PE',
      label: 'Put',
      show: true
    }
  ].filter((x) => Boolean(x))

  return (
    <Box my={2}>
      <ButtonGroup
        variant="outlined"
        aria-label="instrument type"
        color="primary"
        size="small"
        fullWidth>
        {options.map((opt) => {
          if (opt.show) {
            return (
              <Button
                key={opt.type}
                variant={instrumentType === opt.type && 'contained'}
                onClick={() => {
                  setInstrumentType(opt.type)
                }}>
                {opt.label}
              </Button>
            )
          }
          return null
        })}
      </ButtonGroup>
    </Box>
  )
}

const TypeSelectInput = () => {
  const { instrumentType, setInstrumentType } = useContext(
    InstrumentSearchContext
  )

  const options = [
    {
      type: 'FUT',
      label: 'Future',
      show: true
    },
    {
      type: 'CE',
      label: 'Call',
      show: true
    },
    {
      type: 'PE',
      label: 'Put',
      show: true
    }
  ]

  return (
    <Box>
      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          value={instrumentType || options[0]}
          onChange={(e) => {
            setInstrumentType(e.target.value || undefined)
          }}
          label="Type">
          {options.map((option, i) => (
            <MenuItem key={option.type} value={option.type}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default TypeSelectButton
export { TypeSelectInput }
