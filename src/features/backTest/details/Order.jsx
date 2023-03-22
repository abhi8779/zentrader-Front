import { Box, Chip, Typography } from '@material-ui/core'
import { green, grey, orange, red } from '@material-ui/core/colors'
import moment from 'moment'
import React from 'react'
import OrderRefLabel from '../components/OrderRefLabel'
import OrderTypeLabel from '../components/OrderTypeLabel'
import ViewDetailTrade from './ViewDetailTrade'

const Order = ({ order, status = null }) => {
  const DATE_MAP = {
    Accepted: 'placed_at',
    Submitted: 'placed_at',
    Completed: 'executed_at'
  }

  const date = order[DATE_MAP[order.status]]

  return (
    <Box>
      <OrderRefLabel orderRef={order.ref} style={{ marginRight: 4 }} />
      <OrderTypeLabel orderType={order.order_type} />

      <Box mb={0.3} mt={0.3}>
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          {order.size} @ {order.price}
        </Typography>
      </Box>

      {date && (
        <Typography variant="caption">
          {moment(date).format('DD/MM/YYYY HH:mm')}
        </Typography>
      )}

      <Box mt={0.5}>
        <OrderStatusLabel status={status || order.status} />
      </Box>

      {order?.metadata && (
        <Box mt={1}>
          <ViewDetailTrade metadata={order?.metadata} />
        </Box>
      )}

      {/* {order.metadata?} */}
    </Box>
  )
}

const OrderStatusLabel = ({ status }) => {
  const STATUS_MAP = {
    Completed: [orange[400], 'Triggered'],
    Submitted: [green[400], 'Place Order'],
    Accepted: [green[400], 'Place Order'],
    Rejected: [red[400], 'Rejected'],
    Expired: [red[400], 'Expired'],
    Cancelled: [red[400], 'Cancelled'],
    Pending: [grey[400], 'Pending']
  }
  const [statusColor, statusText] = STATUS_MAP[status] || ['red', 'Def']
  return (
    <Chip
      size="small"
      label={statusText}
      mx={10}
      style={{
        background: statusColor,
        color: '#fff',
        paddingLeft: '10px',
        paddingRight: '10px',
        border: 'none'
      }}
    />
  )
}

export default Order
