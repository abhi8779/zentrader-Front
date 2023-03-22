// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import { Box, Button, ButtonGroup, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import InstrumentSearchContext from '../contexts/InstrumentSearchContext'

const ExchangeSelect = () => {
  const { exchange, setExchange } = useContext(InstrumentSearchContext)

  // const { getFeature } = useFeature()
  // const mcxEnabled = getFeature('mcx')
  return (
    <>
      <Box id="exchange-select" mb={2} alignItems="center">
        <Typography
          variant="caption"
          color="textSecondary"
          style={{ marginRight: 16 }}
          component="div">
          EXCHANGE
        </Typography>
        <ButtonGroup
          variant="outlined"
          aria-label="instrument type"
          color="primary"
          size="small"
          fullWidth>
          <Button
            variant={exchange === 'NSE' && 'contained'}
            onClick={() => {
              setExchange('NSE')
              // onChange()
            }}>
            NSE
          </Button>
          <Button
            variant={exchange === 'BSE' && 'contained'}
            onClick={() => {
              setExchange('BSE')
            }}>
            BSE
          </Button>
          <Button
            variant={exchange === 'NFO' && 'contained'}
            onClick={() => {
              setExchange('NFO')
            }}>
            NFO
          </Button>
          <Button
            variant={exchange === 'MCX' && 'contained'}
            onClick={() => {
              setExchange('MCX')
            }}>
            MCX
          </Button>
        </ButtonGroup>
      </Box>
    </>
  )
}

export default ExchangeSelect
