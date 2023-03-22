import { Card, Typography } from '@material-ui/core'
import api from '@/services/trader'
import React, { useEffect, useState } from 'react'
import BNFTrade from './BNFTrade'

function BNFTradeHistory() {
  const [trades, setTrades] = useState(null)
  const [loading, setLoading] = useState()

  useEffect(() => {
    getBnfTrades()
  }, [])

  async function getBnfTrades() {
    try {
      setLoading(true)
      const res = await api.BNF.BNFTrade.get({ status: 'closed' })
      setTrades(res.data.results)
    } catch (e) {
      console.warn(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !trades) {
    return null
  }

  if (trades) {
    return (
      <Card>
        <Typography
          variant="h6"
          style={{ marginTop: 16, marginBottom: 8, marginLeft: 16 }}>
          Historical Trades
        </Typography>
        {trades.map((trade) => (
          <BNFTrade trade={trade} key={trade.id} />
        ))}
      </Card>
    )
  }

  return null
}

export default BNFTradeHistory
