import { Box, Typography } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import React from 'react'

const StockPrice = ({ price, style = {}, ...props }) => {
  return (
    <Box
      style={{
        fontSize: 12,
        color: green[600],
        ...style
      }}
      display="flex"
      alignItems="center"
      {...props}>
      <TrendingUpIcon fontSize="inherit" style={{ marginRight: 4 }} />
      <Typography
        style={{
          fontSize: 12,
          color: green[600],
          ...style
        }}
        variant="caption"
        color="inherit">
        {price}
      </Typography>
    </Box>
  )
}

export default StockPrice
