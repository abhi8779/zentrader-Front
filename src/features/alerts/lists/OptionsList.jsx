// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import moment from 'moment'
import React, { useContext, useEffect } from 'react'
import InstrumentSearchContext from '../contexts/InstrumentSearchContext'

const OptionsList = ({ prePopulate }) => {
  const [expiry, selectExpiry] = React.useState('')
  const [strikeId, selectStrikeId] = React.useState('')

  const {
    selectedInstrument,
    instrumentType,
    getExpiries,
    expiries,
    options,
    getOptions,
    setFormikValue,
    instrumentToPop
  } = useContext(InstrumentSearchContext)

  useEffect(() => {
    // Fetch expiries initially and whenever the type changes
    if (selectedInstrument && instrumentType) {
      getExpiries(instrumentType)
    }
  }, [instrumentType, selectedInstrument])

  useEffect(() => {
    // When new expiries, auto select the first one
    if (expiries?.length) {
      if (instrumentToPop) {
        const editExpiry = expiries.filter(
          (x) => x === instrumentToPop.expiry.date
        )
        if (editExpiry.length) {
          selectExpiry(editExpiry[0])
          return
        }
      }
      selectExpiry(expiries[0])
    }
  }, [expiries])

  useEffect(() => {
    // When an expiry is selected, fetch options
    if (expiry && selectedInstrument) {
      getOptions(instrumentType, expiry)
    }
  }, [expiry, instrumentType, selectedInstrument])

  useEffect(() => {
    if (!options || !selectedInstrument) {
      return
    }

    if (instrumentToPop) {
      const editOption = options.filter((x) => x.id === instrumentToPop.id)
      if (editOption.length) {
        selectStrikeId(editOption[0].id)
        return
      }
    }

    // When options, are fetched, select the relevant strike
    if (!selectedInstrument.last_price) {
      // If no stock LTP is present, select first option
      options && options.length && selectStrikeId(options[0].id)
    } else {
      // Otherwise find the closest strike to LTP and select that.
      if (options && options.length) {
        const closest = options.reduce((a, b) => {
          const aDiff = Math.abs(a.strike - selectedInstrument.last_price)
          const bDiff = Math.abs(b.strike - selectedInstrument.last_price)
          if (aDiff === bDiff) {
            return a.strike > b.strike ? a : b
          } else {
            return bDiff < aDiff ? b : a
          }
        })
        selectStrikeId(closest.id)
      }
    }
  }, [options])

  useEffect(() => {
    // When strike changes, select the matching option
    const strike = options?.filter((x) => x.id === strikeId)
    if (strike && strike.length) {
      setFormikValue(strike[0])
    }
  }, [strikeId])

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel id="select-expiry-label" shrink>
            Expiry
          </InputLabel>
          <Select
            labelId="select-expiry-label"
            id="select-expiry"
            value={expiries && expiries.includes(expiry) ? expiry : ''}
            label="Expiry"
            notched
            onChange={(e) => {
              selectExpiry(e.target.value)
            }}>
            {expiries?.map((expiry) => (
              <MenuItem value={expiry} key={expiry}>
                {moment(expiry).format('DD MMM YYYY')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel id="select-strike-label" shrink>
            Strike
          </InputLabel>
          <Select
            labelId="select-strike-label"
            id="select-strike"
            label="Strike"
            value={
              options && options.filter((x) => x.id === strikeId).length
                ? strikeId
                : ''
            }
            notched
            onChange={(e) => {
              selectStrikeId(e.target.value)
            }}>
            {options?.map((derivative) => (
              <MenuItem value={derivative.id} key={derivative.id}>
                <Box display="flex" alignItems="center" width="100%">
                  {derivative.strike}
                  <Box
                    style={{
                      marginLeft: 'auto',
                      fontSize: 12,
                      color: green[400]
                    }}
                    display="flex"
                    alignItems="center">
                    <TrendingUpIcon
                      fontSize="inherit"
                      style={{ marginRight: 8 }}
                    />
                    <Typography variant="caption" color="inherit">
                      {derivative.last_price}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default OptionsList
