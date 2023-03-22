import { Card } from '@material-ui/core'
import { Container, Grid, makeStyles, Tab, Tabs } from '@material-ui/core'
import React from 'react'
import OrdersTable from './Orders/OrdersTable'
import PositionsContainer from './Positions/PositionContainer'
import StrikeMeasuresContainer from './StrikeMeasures/StrikeMeasuresContainer'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 64
  },
  mainGrid: {
    marginTop: theme.spacing(2)
  },
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0
  }
}))

const OptionSellContainer = () => {
  const classes = useStyles()
  const [visibleTab, setVisibleTab] = React.useState('marketwatch')
  return (
    <>
      <Container className={classes.root}>
        <Grid container spacing={2} className={classes.mainGrid}>
          <Grid item xs={12}>
            {/* <RiskWidget /> */}
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Card square>
                <Tabs
                  value={visibleTab}
                  onChange={(e, value) => {
                    setVisibleTab(value)
                  }}
                  aria-label="simple tabs example">
                  <Tab label="Market Watch" value="marketwatch" />
                  <Tab label="Orders" value="orders" />
                  <Tab label="Positions" value="positions" />
                  {/* <Tab label="Alerts" /> */}
                </Tabs>
              </Card>

              {visibleTab === 'marketwatch' && <StrikeMeasuresContainer />}
              {visibleTab === 'positions' && <PositionsContainer />}
              {visibleTab === 'orders' && <OrdersTable />}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default OptionSellContainer
