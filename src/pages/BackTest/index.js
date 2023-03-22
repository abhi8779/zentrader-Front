import DashboardPage from '@/components/DashboardPage'
import BackTestingStatus from '@/features/backTest/details/BackTestingStatus'
import HistoricalTrades from '@/features/backTest/lists/HistoricalTrades'

import { Box, Card } from '@material-ui/core'

import React from 'react'

const BackTestContainer = () => {
  return (
    <DashboardPage>
      <Box>
        <Box mt={2}>
          <BackTestingStatus />
        </Box>
        <Box mt={2} mb={2}>
          <Card>
            <HistoricalTrades />
          </Card>
        </Box>
      </Box>
    </DashboardPage>
  )
}

export default BackTestContainer
