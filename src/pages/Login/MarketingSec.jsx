import { Card, Box, Typography } from '@material-ui/core'
import { blue, green, purple } from '@material-ui/core/colors'
import BuildIcon from '@material-ui/icons/Build'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import React from 'react'

const MarketingSec = () => {
  return (
    <Box>
      <Typography variant="h6" style={{ fontWeight: 700 }}>
        Get access to powerful tools and learning programs to allow you to trade
        with ease
      </Typography>
      <Section
        icon={(props) => <LocalLibraryIcon {...props} />}
        color={green[500]}
        title="Learn from the best"
        text="Learn from a variety of courses and live classes to get a deep understanding of the market and tools"
      />
      <Section
        icon={(props) => <BuildIcon {...props} />}
        color={blue[500]}
        title="Powerful Tools"
        text="Powerful tools at your disposal to ease your trading workflow and unleash your true potential"
      />
      <Section
        icon={(props) => <TrendingUpIcon {...props} />}
        color={purple[500]}
        title="Proven Strategies"
        text="Access proven and backtested strategies used by thousands of people to make consistent trades and profits"
      />
    </Box>
  )
}

const Section = ({ icon, color, title, text }) => {
  return (
    <Box display="flex" alignItems="flex-start" mt={4}>
      <Card>
        <Box
          color={color}
          fontSize={32}
          p={2}
          display="flex"
          alignItems="center">
          {icon({
            fontSize: 'inherit',
            color: 'inherit'
          })}
        </Box>
      </Card>
      <Box ml={3}>
        <Typography variant="h6" style={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Box>
  )
}

export default MarketingSec
