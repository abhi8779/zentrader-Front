import theme from '@/theme'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core'
import { green, grey, red } from '@material-ui/core/colors'
import InfoIcon from '@material-ui/icons/Info'
import ScheduleIcon from '@material-ui/icons/Schedule'
import moment from 'moment'
import React, { useState } from 'react'
import DateChipValue from '../components/DateChipValue'
import OrderRefLabel from '../components/OrderRefLabel'
import OrderTypeLabel from '../components/OrderTypeLabel'
import Pnl from '../components/Pnl'
import { getRelativeTimeDifference } from '../utils'

const QUANTITY = 25

const HistoricalTradeList = ({ historicalTrades }) => {
  return historicalTrades.map((trade, i) => (
    <HistoricalTradeItem
      key={trade.id}
      status={'Closed'}
      instrument={trade.instrument.name}
      trade={trade}
    />
  ))
}

const HistoricalTradeItem = ({ trade }) => {
  const getOrder = (ref) =>
    trade.orders.find((order) => order.ref.includes(ref))
  const date1 = moment(getOrder('entry').executed_at)
  const date2 = moment(getOrder('sl').executed_at)

  const duration = moment.duration(date2.diff(date1))
  const tradeSpan = Math.floor(duration.asDays())

  const entry = getOrder('entry')
  const exit1 = getOrder('target')
  const exit2 = getOrder('sl')

  const pnl1 = (exit1.price - entry.price) * QUANTITY
  const pnl2 = (exit2.price - entry.price) * QUANTITY

  const pnl1Perc = ((exit1.price - entry.price) / entry.price) * 100
  const pnl2Perc = ((exit2.price - entry.price) / entry.price) * 100

  return (
    <>
      <Box
        m={2}
        display="flex"
        alignItems={'center'}
        style={{ gap: theme.spacing(2) }}>
        <Box width={'60px'}>
          <Typography
            variant="body1"
            style={{
              fontWeight: '600',
              color: trade.tradeid === 'buy' ? green[500] : red[500]
            }}>
            {trade.tradeid?.toUpperCase()}
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={6} sm={3} md={3} lg={3}>
            <Order order={getOrder('entry')} />
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3}>
            <Order
              order={getOrder('target')}
              pnl={pnl1}
              percentage={pnl1Perc}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3}>
            <Order order={getOrder('sl')} pnl={pnl2} percentage={pnl2Perc} />
          </Grid>
        </Grid>

        <Box display={'flex'} style={{ gap: theme.spacing(2) }}>
          <Box display={'flex'} flexDirection="column" alignItems={'end'}>
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
          <Box display={'flex'} flexDirection="column" alignItems={'end'}>
            <Pnl title={`P&L`} pnl={trade.pnl} alignItems="end" />

            <Box display={'flex'} alignItems="center" style={{ gap: 4 }}>
              <Typography variant="caption">
                <span
                  style={{
                    color: trade.pnl >= 0 ? green[500] : red[500]
                    // fontSize: 10
                  }}>
                  ₹{tradeSpan ? Math.round(trade.pnl / tradeSpan) : trade.pnl}
                </span>{' '}
                /day
              </Typography>
            </Box>
          </Box>

          <Info totalPnl={trade.pnl} getOrder={getOrder} />
        </Box>
      </Box>
      <Divider />
    </>
  )
}

const Order = ({ order, pnl, percentage }) => {
  const accepted = order.status === 'Accepted'
  return (
    <Box display={'flex'} style={{ gap: theme.spacing(2) }}>
      <Box style={{ gap: theme.spacing(1) }}>
        <OrderRefLabel orderRef={order.ref} style={{ marginRight: 4 }} />
        <OrderTypeLabel orderType={order.order_type} />

        <Box mt={1}>
          <Typography variant="caption">
            {accepted
              ? '-'
              : moment(order.executed_at).format('DD MMM YYYY h:mm a')}
          </Typography>
        </Box>

        <Box display={'flex'} style={{ gap: 4 }} alignItems="center">
          <Typography style={{ fontWeight: 600 }} variant="body1">
            {accepted ? '-' : `${order.size} @ ₹ ${order.price}`}
          </Typography>
        </Box>
        {(pnl || pnl === 0) && (
          <Box display={'flex'} style={{ gap: 6 }}>
            <Typography variant="body2">P&L </Typography>
            <Typography
              variant="body2"
              style={{ color: pnl >= 0 ? green[500] : red[500] }}>
              {' '}
              {accepted ? '-' : `₹${Math.floor(pnl)} `}
            </Typography>
            <Typography variant="body2">
              {accepted ? '-' : `${Math.abs(percentage).toFixed(2)}%`}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

function Info({ getOrder }) {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Tooltip title="View Details">
        <IconButton onClick={handleClick}>
          <InfoIcon style={{ color: grey[400] }} />
        </IconButton>
      </Tooltip>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Historical trades details
        </DialogTitle>
        <DialogContent>
          <Box>
            <InfoSection order={getOrder('entry')} />
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
            <InfoSection order={getOrder('target')} />
            <Box mt={2} mb={2}>
              <Divider />
            </Box>

            <InfoSection order={getOrder('sl')} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const InfoSection = ({ order }) => {
  return (
    <>
      <Box
        mb={2}
        display="flex"
        alignItems={'start'}
        flexDirection="column"
        style={{ gap: theme.spacing(1) }}>
        <Box>
          <OrderRefLabel orderRef={order.ref} style={{ marginRight: 4 }} />
          <OrderTypeLabel orderType={order.order_type} />
        </Box>
        <Box display={'flex'} style={{ gap: theme.spacing(2) }}>
          <Box
            display="flex"
            alignItems={'center'}
            style={{ gap: theme.spacing(1) }}>
            <ScheduleIcon fontSize="small" />
            <Typography variant="caption">
              {moment(order.executed_at).format('DD MMM YYYY h:mm:ss a')}
            </Typography>
          </Box>
          <Box display={'flex'} style={{ gap: 4 }} alignItems="center">
            <Typography style={{ fontWeight: 600 }} variant="body1">
              {order.size} @ ₹{order.price}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <DateChipValue
            label={'2 Days'}
            value={order.metadata['2dhh'] || '-'}
            valueDes={order.metadata['2dll'] || '-'}
          />
        </Grid>
        <Grid item xs={3}>
          <DateChipValue
            label={'9:20 AM'}
            value={order.metadata['920_high'] || '-'}
            valueDes={order.metadata['920_low'] || '-'}
          />
        </Grid>

        <Grid item xs={3}>
          <DateChipValue
            label={'9:30 AM'}
            value={order.metadata['930_high'] || '-'}
            valueDes={order.metadata['930_low'] || '-'}
          />
        </Grid>
        <Grid item xs={3}>
          <DateChipValue
            label={'Day'}
            value={order.metadata.day_high || '-'}
            valueDes={order.metadata.day_low || '-'}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default HistoricalTradeList
