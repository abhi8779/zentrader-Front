import { Card, Container, Grid, makeStyles, Tab, Tabs } from '@material-ui/core'
import React from 'react'
// import RiskWidget from './Risk/RiskWidget'̦

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

const StockFutureContainer = () => {
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
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default StockFutureContainer
