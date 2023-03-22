import TrendLblVal from '@/components/TrendLblVal'
import theme from '@/theme'
import { Box, IconButton, Typography } from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import AddToPortfolioNameButton from '../buttons/AddToPortfolioNameButton'

const InstrumentDetails = () => {
  const history = useHistory()
  const ccData = useSelector((s) => s.ath.athDetail.data)
  const instrument = ccData?.[0]?.instrument

  if (!instrument) {
    return null
  }

  return (
    <>
      <Box width="100%" p={2}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} alignItems={'center'}>
            <IconButton
              onClick={() => {
                history.goBack()
              }}>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h6" style={{ fontWeight: 700 }}>
              {instrument.name}
            </Typography>
          </Box>
          <Box>
            <AddToPortfolioNameButton resultId={ccData?.[0]?.id} />
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <Box bgcolor={grey[300]} py={0.5} px={1} borderRadius={2}>
            <Typography variant="body1">{instrument.tradingsymbol}</Typography>
          </Box>
          <Box
            color={green[500]}
            fontSize={24}
            display="flex"
            alignItems="center"
            ml={2}>
            <TrendingUpIcon fontSize="inherit" />
            <Typography
              variant="body1"
              color="inherit"
              style={{ fontWeight: 700 }}>
              {instrument.last_price}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          mt={2}
          style={{ gap: theme.spacing(2) }}>
          <TrendLblVal
            verified={ccData?.mc_verified}
            label="Market Cap"
            value={`${instrument.market_cap} Cr.`}
          />
          <TrendLblVal
            label="Date of Inception"
            value={moment(instrument.inception_date).format('Do MMMM, YYYY')}
          />
          <TrendLblVal
            label="Company Age"
            verified={ccData.age_verified}
            value={
              moment().diff(moment(instrument.inception_date), 'years') +
              'y ' +
              (moment().diff(moment(instrument.inception_date), 'months') %
                12) +
              'm'
            }
          />
        </Box>
      </Box>
    </>
  )
}

export default InstrumentDetails
