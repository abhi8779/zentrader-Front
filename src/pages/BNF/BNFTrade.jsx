import SmallChip from '@/components/SmallChip'
import { Box, Grid, Typography } from '@material-ui/core'
import { green, grey, red } from '@material-ui/core/colors'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import moment from 'moment'
import React from 'react'
function BNFTrade({ trade }) {
  return (
    <Box p={2} borderTop="1px solid #f3f3f3">
      <Grid container>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            style={{
              color: trade.trade_type === 'buy' ? green[400] : red[400],
              fontWeight: 700
            }}>
            {trade.trade_type.toUpperCase()}
          </Typography>
          <TradeStatus status={trade.status} />
        </Grid>
        <Grid item xs={3}>
          <Order label={'Entry'} order={trade.entry} />
        </Grid>
        <Grid item xs={3}>
          <Order label={'Target'} order={trade.target} />
        </Grid>
        <Grid item xs={3}>
          <Order label={'SL'} order={trade.sl} />
        </Grid>
      </Grid>
    </Box>
  )
}

function Order({ label, order }) {
  const orderTypeMap = {
    buy: {
      text: 'B',
      color: green[700]
    },
    sell: {
      text: 'S',
      color: red[700]
    }
  }
  return (
    <Box>
      <Typography variant="button">{label}</Typography>

      <Box display="flex" alignItems="center" mb={0.5} mt={0.5}>
        <SmallChip
          style={{
            minWidth: 20,
            fontSize: 12,
            textAlign: 'center',
            marginRight: 8,
            fontWeight: 700
          }}
          label={orderTypeMap[order.type].text}
          color={orderTypeMap[order.type].color}
          bgColor={grey[300]}
        />
        <Typography>
          {order.quantity} @ {order.trigger}
        </Typography>
      </Box>

      {order.status === 'Completed' && (
        <Typography
          variant="caption"
          style={{ display: 'flex', alignItems: 'center' }}>
          <CheckBoxIcon
            fontSize="small"
            style={{ marginRight: 6, color: green[500] }}
          />
          {moment(order.executed_at).format('Do MMM, YYYY')}
        </Typography>
      )}

      {order.status === 'active' && (
        <SmallChip bgColor={green[500]} label={'Active'} />
      )}
    </Box>
  )
}

function TradeStatus({ status }) {
  let color
  switch (status) {
    case 'open':
      color = green[500]
      break
    case 'closed':
      color = grey[500]
      break
    case 'pending':
      color = grey[500]
      break

    default:
      break
  }
  return <SmallChip bgColor={color} label={status.toUpperCase()} />
}

export default BNFTrade
