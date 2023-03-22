import CustomChip from '@/components/CustomChip'
import { grey } from '@material-ui/core/colors'
import React from 'react'

const OrderRefLabel = ({ orderRef, ...props }) => {
  const ORDER_REF_MAP = {
    sell_entry: 'Entry',
    sell_target: 'Target',
    sell_sl: 'SL',
    buy_entry: 'Entry',
    buy_target: 'Target',
    buy_sl: 'SL'
  }

  return (
    <CustomChip
      label={ORDER_REF_MAP[orderRef] || orderRef}
      bgColor={grey[700]}
      {...props}
    />
  )
}

export default OrderRefLabel
