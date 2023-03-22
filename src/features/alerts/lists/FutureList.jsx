import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import InstrumentSearchContext from '../contexts/InstrumentSearchContext'

const FutureList = () => {
  const {
    futures,
    setFormikValue,
    getFutures,
    selectedInstrument,
    instrumentToPop
  } = useContext(InstrumentSearchContext)
  const [futureId, setFutureId] = useState('')

  useEffect(() => {
    // When futureId, select the matching future as final
    const selectedFuture = futures?.filter((x) => x.id === futureId)
    if (selectedFuture && selectedFuture.length) {
      setFormikValue(selectedFuture[0])
    }
  }, [futureId])

  useEffect(() => {
    // When futures change, select the first future from the list
    if (futures) {
      // If an instrument is being edited, select that as current
      if (instrumentToPop) {
        const editFuture = futures.filter((x) => x.id === instrumentToPop.id)
        if (editFuture.length) {
          setFutureId(editFuture[0].id)
          return
        }
      }
      setFutureId(futures[0]?.id)
    } else {
      setFutureId('')
    }
  }, [futures])

  useEffect(() => {
    // Get futures initially
    if (selectedInstrument) {
      getFutures()
    }
  }, [selectedInstrument])

  return (
    <Box>
      <FormControl variant="outlined" size="small" fullWidth>
        <InputLabel id="select-future-label">Future</InputLabel>
        <Select
          labelId="select-future-label"
          id="select-future"
          label="Future"
          value={futures ? futureId : ''}
          onChange={(e) => {
            setFutureId(e.target.value)
          }}>
          {futures?.map((fut) => (
            <MenuItem value={fut.id} key={fut.id}>
              <Box display="flex" alignItems="center" width="100%">
                {moment(fut.expiry).format('DD MMM YYYY')}
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
                    {fut.last_price}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default FutureList
