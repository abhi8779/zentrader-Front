import ErrorMessage from '@/components/ErrorMessage'
import LabelValue from '@/components/LabelValue'
import ZenApi from '@/services/trader'
import theme from '@/theme'
import {
  Box,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Typography
} from '@material-ui/core'
import { green, red } from '@material-ui/core/colors'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import DateChipValue from '../components/DateChipValue'
import ActiveTradesList from '../lists/ActiveTradesList'

const BackTestingStatus = () => {
  const [strategyData, setStrategyData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const [isError, setIsError] = useState(null)
  const openTrade = strategyData?.active_trades?.find(
    (trade) => trade.status === 'Open'
  )

  useEffect(() => {
    getBTStrategyRun()
    const timer = setInterval(() => getBTStrategyRun(), 30000)
    return () => clearInterval(timer)
  }, [])

  const getBTStrategyRun = async (offSet, limit) => {
    try {
      const res = await ZenApi.Broker.BTStrategyRun.get({
        expand: 'instrument.expiry,position',
        limit,
        offset: offSet
      })
      setStrategyData(res.data.results[0])
    } catch (error) {
      setIsError(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isError) {
    return <ErrorMessage />
  }

  if (!strategyData || isLoading) {
    return (
      <Card
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing(4)
        }}>
        <CircularProgress />
      </Card>
    )
  }

  return (
    <>
      <Card style={{ marginBottom: theme.spacing(2) }}>
        <HeaderBanner date={strategyData.last_bar} />

        <Box px={3} py={3}>
          <Grid container style={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={4} sm={3} md={2} lg={2}>
              <InstrumentInfo instrument={strategyData.instrument} />
              <GapStatusLabel info={strategyData.info} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={10}>
              <Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Box display={'flex'} style={{ gap: '80px' }}>
                    <LabelValue
                      label={`Position Status`}
                      value={openTrade ? 'Active' : 'Inactive'}
                    />
                    <LabelValue
                      label={`Trade Type`}
                      value={openTrade?.tradeid === 'buy' ? 'Long' : 'Short'}
                    />
                    <LabelValue
                      label={`Entry Price`}
                      value={openTrade?.price}
                    />
                    <LabelValue
                      label={`Current Status`}
                      value={strategyData.info.current_status}
                    />
                    <LabelValue
                      label={`Current Qty`}
                      value={`${strategyData.position.size} x ${strategyData.instrument.lot_size}`}
                    />
                  </Box>
                </Box>
                <Divider />
                <Box style={{ marginTop: '15px' }}>
                  <Box display={'flex'} style={{ gap: '80px' }}>
                    <DateChipValue
                      label={'Day'}
                      value={strategyData.info.day_high}
                      valueDes={strategyData.info.day_low}
                    />
                    <DateChipValue
                      label={'2 Days'}
                      value={strategyData.info['2dhh']}
                      valueDes={strategyData.info['2dll']}
                    />
                    <DateChipValue
                      label={'9:20 AM'}
                      value={strategyData.info['920_high']}
                      valueDes={strategyData.info['920_low']}
                    />
                    <DateChipValue
                      label={'9:30 AM'}
                      value={strategyData.info['930_high']}
                      valueDes={strategyData.info['930_low']}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>

      {strategyData?.active_trades && (
        <Box mt={2}>
          <ActiveTradesList
            strategyRun={strategyData}
            trades={strategyData?.active_trades}
            info={strategyData?.info}
          />
        </Box>
      )}
    </>
  )
}

const HeaderBanner = ({ date }) => {
  return (
    <Box bgcolor={'info.main'} px={2} py={1}>
      <Typography
        variant="body1"
        style={{
          // marginTop: theme.spacing(1),
          // marginBottom: theme.spacing(1),
          // marginLeft: theme.spacing(2),
          color: '#fff'
        }}>
        Data processed till{' '}
        <strong>{moment(date).format('DD/MM/YYYY HH:mm')}</strong>
      </Typography>
    </Box>
  )
}

const InstrumentInfo = ({ instrument }) => {
  return (
    <Box>
      <Typography variant="body1" color="textSecondary">
        Instrument
      </Typography>
      <Typography variant="h5" style={{ fontWeight: 700 }}>
        {instrument.name}
      </Typography>
      <Box display={'flex'} style={{ gap: '2px' }}>
        <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
          FUTURE
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {moment(instrument.expiry.date).format('DD MMM YYYY')}
        </Typography>
      </Box>
      <Box>
        <Box fontSize={24} display="flex" alignItems="center">
          <TrendingUpIcon
            fontSize="inherit"
            style={{ marginRight: 4, color: 'green' }}
          />
          <Typography
            variant="body1"
            style={{ fontWeight: 700, color: 'green' }}>
            {instrument.last_price}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="caption" color="textSecondary">
          LOT SIZE {instrument.lot_size}
        </Typography>
      </Box>
    </Box>
  )
}

const GapStatusLabel = ({ info }) => {
  if (info.gap_up) {
    return (
      <Chip
        label="Gap Up"
        style={{
          color: 'white',
          backgroundColor: green[400],
          borderRadius: '10px',
          fontWeight: 'bold'
        }}
      />
    )
  }

  if (info.gap_up) {
    return (
      <Chip
        label="Gap Down"
        style={{
          color: 'white',
          backgroundColor: red[400],
          borderRadius: '10px',
          fontWeight: 'bold'
        }}
      />
    )
  }

  return null
}

export default BackTestingStatus
