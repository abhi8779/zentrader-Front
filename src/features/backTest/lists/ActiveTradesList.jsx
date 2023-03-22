import theme from '@/theme'
import { Box, Card, Chip, Divider, Typography } from '@material-ui/core'
import { green, grey, red } from '@material-ui/core/colors'
import moment from 'moment'
import React from 'react'
import Pnl from '../components/Pnl'
import Order from '../details/Order'
import { getRelativeTimeDifference } from '../utils'

// import BNFTrade from './BNFTrade'
const ActiveTradesList = ({ strategyRun, trades, info }) => {
  const buyTrade = trades?.find((trade) => trade.tradeid === 'buy')
  const sellTrade = trades?.find((trade) => trade.tradeid === 'sell')
  return (
    <Card>
      <Typography
        variant="h6"
        style={{
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
          marginLeft: theme.spacing(2)
        }}>
        Active Trades
      </Typography>
      <Box mt={2}>
        {buyTrade && (
          <TradesListItem
            data={buyTrade}
            tradeInfo={info?.buy_trade}
            strategyRun={strategyRun}
          />
        )}
        {sellTrade && (
          <TradesListItem
            data={sellTrade}
            tradeInfo={info?.sell_trade}
            strategyRun={strategyRun}
          />
        )}
      </Box>
      <Box>
        <Divider />
      </Box>
    </Card>
  )
}

const TradesListItem = ({ data, tradeInfo, strategyRun }) => {
  function getOrder(key) {
    return data.orders.find((order) => order.ref.indexOf(key) > -1)
  }
  const entry = getOrder('entry')
  const target = getOrder('target')
  const sl = getOrder('sl')

  const date1 = moment(entry.executed_at)
  const date2 = moment(target.executed_at)

  return (
    <Box
      p={2}
      borderTop="1px solid #f3f3f3"
      display={'flex'}
      style={{ gap: '50px' }}
      alignItems="center">
      <Box
        // my={1}
        textAlign={'center'}
        width={100}
        display={'flex'}
        alignItems="center"
        justifyContent={'center'}
        flexDirection={'column'}>
        <TradeTypeLabel tradeid={data.tradeid} />
        <TradeStatusLabel status={data.status} />
      </Box>
      <Box>
        <Order order={entry} />
      </Box>
      <Box>
        <Order order={target || tradeInfo?.target} />
      </Box>
      <Box>
        <Order
          order={sl || tradeInfo?.sl}
          status={strategyRun.sl_missed ? 'SL missed' : null}
        />
      </Box>

      {data.status === 'Open' && (
        <Box
          display={'flex'}
          ml="auto"
          // flexDirection="column"
          mr={2}
          style={{ gap: theme.spacing(2) }}>
          <Box display={'flex'} alignItems={'end'} flexDirection="column">
            <Typography
              style={{ whiteSpace: 'nowrap' }}
              variant="body2"
              color="textSecondary">
              Span
            </Typography>
            <Typography style={{ whiteSpace: 'nowrap' }}>
              {getRelativeTimeDifference(date1, date2) || '-'}
            </Typography>
          </Box>
          <Pnl title={`P&L`} pnl={data.pnl} alignItems="end" />
        </Box>
      )}
    </Box>
  )
}

const TradeTypeLabel = ({ tradeid, status }) => {
  const LABEL_MAP = {
    buy: [green[400], 'LONG'],
    sell: [red[400], 'SHORT']
  }

  const [color, label] = LABEL_MAP[tradeid] || [grey[400], 'DEF']

  return (
    <Chip
      label={label}
      style={{
        color: 'white',
        backgroundColor: color,
        borderRadius: '10px',
        fontWeight: 'bold'
      }}
    />
  )
}

const TradeStatusLabel = ({ status }) => {
  const STATUS_MAP = {
    Open: [green[400], 'Open'],
    Created: [grey[400], 'Closed']
  }
  const [color, label] = STATUS_MAP[status] || [grey[400], status]
  return (
    <Box style={{ color }}>
      <Typography variant="body2" color="inherit">
        <strong>{label}</strong>
      </Typography>
    </Box>
  )
}

export default ActiveTradesList
