// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import { Box, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { green } from '@material-ui/core/colors'
import TextField from '@material-ui/core/TextField'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { useEffect, useState } from 'react'
import InstrumentSearchContext from '../contexts/InstrumentSearchContext'

export default function InstrumentSearchField({
  label,
  setLtp,
  onError,
  ...props
}) {
  const [open, setOpen] = useState(false)
  const [inpValue, setInpValue] = useState(false)
  const {
    selectedInstrument,
    setSelectedInstrument,

    loadingInstruments,
    instruments,
    getInstruments,

    clearInputs,
    value,
    error
  } = React.useContext(InstrumentSearchContext)

  useEffect(() => {
    onError && onError(error)
  }, [error])

  useEffect(() => {
    // When input changes & If there is not any error fetch instruments
    getInstruments(inpValue)
  }, [inpValue])

  useEffect(() => {
    // When input changes, fetch instruments
    if (value && typeof value === 'object') {
      if (value.underlying) {
        setInpValue(value.underlying.tradingsymbol)
        setSelectedInstrument(value.underlying)
      } else {
        setInpValue(value.tradingsymbol)
      }
    }
  }, [value])

  return (
    <>
      <Autocomplete
        id="async-instrument-search"
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        clearOnBlur={false}
        value={selectedInstrument}
        filterOptions={(x) => x}
        onChange={(event, newValue, reason) => {
          event.preventDefault()
          if (['clear'].includes(reason)) {
            clearInputs()
          } else {
            setSelectedInstrument(newValue)
          }
        }}
        forcePopupIcon={false}
        autoHighlight={true}
        onInputChange={(event, newInputValue, reason) => {
          if (reason !== 'reset') {
            setInpValue(newInputValue)
          }
        }}
        getOptionSelected={(option, value) => option.id === value.id}
        getOptionLabel={(option) => {
          if (!option) {
            return ''
          }
          if (option?.underlying) {
            return option.underlying.tradingsymbol
          } else {
            return option?.tradingsymbol
          }
        }}
        options={instruments}
        placeholder="Search for scrip"
        renderInput={(params) => (
          <Box id="search-scrip">
            <TextField
              {...params}
              label="Scrip"
              variant="outlined"
              placeholder="Search for scrip"
              size="small"
              name={props.name}
              style={{ minWidth: 300 }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loadingInstruments ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}

                    {selectedInstrument &&
                      selectedInstrument?.last_price !== null && (
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
                            {selectedInstrument.last_price}
                          </Typography>
                        </Box>
                      )}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                )
              }}
            />
          </Box>
        )}
        renderOption={(option) => <InstrumentOption instrument={option} />}
      />
    </>
  )
}

const InstrumentOption = ({ instrument }) => {
  return (
    <Box display="flex" style={{ width: '100%' }}>
      <Box>
        <Typography variant="body2" color="textPrimary">
          {instrument.name}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {instrument.tradingsymbol}
        </Typography>
      </Box>
      <Box
        style={{ marginLeft: 'auto', fontSize: 12, color: green[400] }}
        display="flex"
        alignItems="center">
        <TrendingUpIcon fontSize="inherit" style={{ marginRight: 8 }} />
        <Typography variant="caption" color="inherit">
          {instrument.last_price}
        </Typography>
      </Box>
    </Box>
  )
}
