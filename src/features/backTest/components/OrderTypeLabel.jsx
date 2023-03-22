import CustomChip from '@/components/CustomChip'
import { green, red } from '@material-ui/core/colors'
import React from 'react'

const OrderTypeLabel = ({ orderType, ...props }) => {
  const ORDER_TYPE_MAP = {
    Buy: green[400],
    Sell: red[400]
  }
  return (
    <CustomChip
      label={orderType}
      bgColor={ORDER_TYPE_MAP[orderType]}
      {...props}
    />
  )
}

export default OrderTypeLabel
