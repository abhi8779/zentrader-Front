import { Card } from '@material-ui/core'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import React from 'react'
import {
  CartContext,
  RiskContext,
  UserItemsContext
} from '../../../contexts/AppContext'
const useStyles = makeStyles({
  riskSection: {
    // minWidth: 650,
    // marginTop: 16,
    // padding: 16,
  },
  sectionTop: {
    paddingLeft: 16,

    paddingRight: 16,
    paddingTop: 16
  }
})

export default function RiskWidget() {
  const { risk, totalRisk } = React.useContext(RiskContext)
  const { orders, positions } = React.useContext(UserItemsContext)
  const { cartItems } = React.useContext(CartContext)
  const classes = useStyles()

  React.useEffect(() => {}, [cartItems, orders, positions])
  return (
    <Card className={classes.riskSection} style={{ padding: 0 }}>
      <Box>
        <Grid container>
          <Grid item style={{ padding: 8, backgroundColor: green[300] }}>
            <Typography
              variant="overline"
              component="div"
              style={{ fontWeight: 'bold' }}>
              Risk
            </Typography>
            <Typography variant="button" component="div">
              Call
            </Typography>
            <Typography variant="button" component="div">
              Put
            </Typography>
          </Grid>
          <RiskSection
            label="Cart Risk"
            ce={risk?.cart.CE}
            pe={risk?.cart.PE}
            bg
          />
          <RiskSection
            label="Order Risk"
            ce={risk?.order.CE}
            pe={risk?.order.PE}
          />
          <RiskSection
            label="Position Risk"
            ce={risk?.position.CE}
            pe={risk?.position.PE}
            bg
          />
          <RiskSection label="Total Risk" ce={totalRisk.CE} pe={totalRisk.PE} />
        </Grid>
      </Box>
    </Card>
  )
}

function RiskSection({ label, ce, pe, bg }) {
  return (
    <Grid item style={{ backgroundColor: bg ? '#f3f3f3' : '', padding: 8 }}>
      <Typography variant="overline" component="div">
        {label}
      </Typography>
      <Typography variant="button" component="div">
        {ce}
      </Typography>
      <Typography variant="button" component="div">
        {pe}
      </Typography>
    </Grid>
  )
}
