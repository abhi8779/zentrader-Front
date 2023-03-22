import { widget as TVWidget } from '@/assets/libs/tradingview/charting_library'
import InstrumentSearchBar from '@/pages/Charts/InstrumentSearchBar'
import api from '@/services/trader'
import theme from '@/theme'
import { Box, Card, makeStyles, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import React, { useEffect, useState } from 'react'

import DashboardPage from '../DashboardPage'
import ErrorMessage from '../ErrorMessage'
import datafeed from './datafeed'
const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%'
  }
}))

const TradingViewChart = () => {
  const [tvWidget, setWidget] = useState(null)
  const [value, setValue] = useState('12314')
  const [cont, setCont] = useState(false)
  const ref = React.createRef()
  const classes = useStyles()
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    if (value && tvWidget) {
      let symbol = String(value?.id)
      if (cont) {
        symbol += '_c'
      }

      tvWidget.setSymbol(symbol, '1D')
    }
  }, [value, cont])

  useEffect(() => {
    // initChart()
    getFirstNiftyChart('AXISBANK')
    return () => {
      if (tvWidget !== null) {
        tvWidget.remove()
        setWidget(null)
      }
    }
  }, [])

  function initChart(defaultSymbol) {
    const widgetOptions = {
      symbol: value,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: datafeed,
      interval: 'D',
      container: 'tv-container',
      library_path:
        (process.env.FRONTEND_ONLY ? 'https://testing.rytt.com/' : '') +
        '/static/charting_library/',
      locale: 'en',
      timezone: 'Asia/Kolkata',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: [],
      fullscreen: false,
      autosize: true,
      style: '1',
      debug: true,
      custom_css_url: '/static/tv_css/tv_styles.css'
    }

    const widget = new TVWidget({ ...widgetOptions, symbol: defaultSymbol })

    setWidget(widget)
  }

  const getFirstNiftyChart = async (val) => {
    try {
      const res = await api.MarketData.Instrument.get({
        search: val,
        exchange: 'NSE',
        underlying__isnull: true
      })
      initChart(res.data.results[0].id)
    } catch (error) {
      setIsError(error)
      console.error(error)
    }
  }

  return (
    <DashboardPage>
      <Box display="flex" height="100%" flexDirection="column" mb={2} mt={2}>
        <Card
          style={{ padding: theme.spacing(2), marginBottom: theme.spacing(2) }}>
          <Box display={'flex'} alignItems="center">
            <Box width={'100%'}>
              <InstrumentSearchBar
                onChange={setValue}
                setContinuous={setCont}
              />
            </Box>

            {value?.market_cap && <MarketInfo marketCap={value?.market_cap} />}
          </Box>
        </Card>

        <Card
          style={{
            flexGrow: '1'
          }}>
          {isError && (
            <Box margin={2}>
              <ErrorMessage errorStatus={isError?.response?.status} />
            </Box>
          )}
          {!isError && (
            <div ref={ref} className={classes.container} id="tv-container" />
          )}
        </Card>
      </Box>
    </DashboardPage>
  )
}
const MarketInfo = ({ marketCap }) => {
  return marketCap ? (
    <Box ml={'auto'} justifyContent={'flex-end'} textAlign="right">
      <Typography
        variant="overline"
        style={{ color: grey[500], lineHeight: 1 }}>
        Market Cap
      </Typography>
      <Typography variant="body2">{marketCap} CR</Typography>
    </Box>
  ) : null
}

export default TradingViewChart
