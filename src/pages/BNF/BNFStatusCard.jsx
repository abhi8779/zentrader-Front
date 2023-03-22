import { Card, Box, Chip, Grid, Typography } from '@material-ui/core'
import api from '@/services/trader'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import BNFTrade from './BNFTrade'

function BNFStatusCard() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState()

  useEffect(() => {
    getBnfStatus()
  }, [])

  async function getBnfStatus() {
    try {
      setLoading(true)
      const res = await api.BNF.BNFStatus.get()
      setStatus(res.data.results[0])
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  const tradeStatusMap = {
    buy_on: 'BUY ON',
    sell_on: 'SELL ON',
    nil: 'NIL'
  }

  if (loading && !status) {
    return null
  }

  if (status) {
    return (
      <>
        <Card style={{ marginBottom: 16 }}>
          <Typography
            variant="h6"
            style={{ marginTop: 16, marginBottom: 8, marginLeft: 16 }}>
            Current Status
          </Typography>
          <Box p={3}>
            <Grid container>
              <Grid item xs={3}>
                {/* <Typography variant="overline">Status</Typography> */}
                <br />
                {/* <Typography>{status.status}</Typography> */}
                <Chip label={tradeStatusMap[status.status]} />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="overline">Instrument</Typography>
                <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                  {status.instrument.name} {status.instrument.type}
                </Typography>
                <Typography variant="subtitle2">
                  {moment(status.instrument.expiry.date).format('DD MMM YYYY')}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="caption">2DH</Typography>
                <Typography>{status.day_2_high}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="caption">2DH</Typography>
                <Typography>{status.day_2_high}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card style={{ marginBottom: 16 }}>
          <Typography
            variant="h6"
            style={{ marginTop: 16, marginBottom: 8, marginLeft: 16 }}>
            Active Trades
          </Typography>
          {status.open_trades.map((trade) => (
            <BNFTrade trade={trade} key={trade.id} />
          ))}
        </Card>
      </>
    )
  }

  return null
}

export default BNFStatusCard
