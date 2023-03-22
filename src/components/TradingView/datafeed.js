import ZenApi from '@/services/trader'
// import moment from 'moment'

const configurationData = {
  supported_resolutions: ['1', '5', '15', '75', '1D', '1W', '1M'],
  exchanges: [
    {
      value: 'NSE',
      name: 'NSE',
      desc: 'National Stock Exchange'
    },
    {
      value: 'BSE',
      name: 'BSE',
      desc: 'Bombay Stock Exchange'
    },
    {
      value: 'CDS',
      name: 'CDS',
      desc: 'Currencies (NSE)'
    },
    {
      value: 'BCD',
      name: 'BCD',
      desc: 'Currencies (BSE)'
    },
    {
      value: 'MCX',
      name: 'MCX',
      desc: 'Commodity Exchange'
    }
  ],
  symbols_types: [
    {
      name: 'Index',
      value: 'INDEX'
    },
    {
      name: 'Future',
      value: 'FUT'
    },
    {
      name: 'Call Option',
      value: 'CE'
    },
    {
      name: 'Put Option',
      value: 'PE'
    },
    {
      name: 'Stock',
      value: 'EQ'
    }
  ]
}

const exchangeTimings = {
  NSE: '0915-1530',
  BSE: '0915-1530',
  BCD: '0900-1700',
  CDS: '0900-1700',
  MCX: '1000-2330'
}

const datafeed = {
  onReady: (callback) => {
    console.log('[onReady]: Method call')
    setTimeout(() => callback(configurationData))
  },
  searchSymbols: async (
    userInput,
    exchange,
    symbolType,
    onResultReadyCallback
  ) => {
    const res = await ZenApi.MarketData.Instrument.get({
      search: userInput.toUpperCase(),
      exchange,
      type: symbolType
    })

    onResultReadyCallback(
      res.data.results.map((x) => ({
        symbol: x.tradingsymbol,
        full_name: `${x.exchange}:${x.tradingsymbol}`,
        description: x.name,
        exchange: x.exchange,
        ticker: String(x.id),
        type: x.type
      }))
    )
  },
  resolveSymbol: async (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    const parts = symbolName.split('_')
    const res = await ZenApi.MarketData.Instrument.get({
      id: parts[0]
    })

    const x = res.data.results[0]
    x &&
      onSymbolResolvedCallback({
        symbol: x.tradingsymbol + (parts[1] ? '_C' : ''),
        name: `${x.tradingsymbol}` + (parts[1] ? '_C' : ''),
        description: x.name,
        exchange: x.exchange,
        ticker: String(x.id) + (parts[1] ? '_C' : ''),
        type: x.type,
        session: exchangeTimings[x.exchange],
        timezone: 'Asia/Kolkata',
        has_intraday: true,
        has_weekly_and_monthly: true,
        // weekly_multipliers: ['1'],
        // monthly_multipliers: ['1'],
        continuous: Boolean(parts[1])
      })
    console.log('[resolveSymbol]: Method call', symbolName)
  },
  getBars: async (
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) => {
    try {
      console.log('[getBars]: Method call', symbolInfo)
      const res = await ZenApi.MarketData.HistoricalData.get(
        symbolInfo.symbol.split('_')[0],
        symbolInfo.exchange,
        resolution,
        periodParams.from,
        periodParams.to,
        periodParams,
        symbolInfo.continuous
      )

      onHistoryCallback(res.data?.data, {
        nextTime: res.data?.meta.next_time || false,
        noData: res.data?.meta.no_data
      })
    } catch (error) {
      onErrorCallback(`Something went wrong ${error?.message}`)
    }
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID)
  },
  unsubscribeBars: (subscriberUID) => {
    console.log(
      '[unsubscribeBars]: Method call with subscriberUID:',
      subscriberUID
    )
  }
}

export default datafeed
