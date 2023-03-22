import AvailableComplimentarySubs from '@/components/AvailableComplimentarySubs'
import { Card, makeStyles, Tab, Tabs, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import AthPortfolio from '../athPortfolio/lists/AthPortfolio'
import AthResultsList from '../athResults/lists/AthResultsList'

const useStyles = makeStyles((theme) => ({
  athCard: {
    // height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const AthList = ({ version }) => {
  const theme = useTheme()
  const classes = useStyles()
  const [visibleTab, setVisibleTab] = useState('list')

  return (
    <Card className={classes.athCard}>
      <AvailableComplimentarySubs planGroup={'ath'} />
      <Tabs
        style={{ paddingLeft: theme.spacing(2) }}
        value={visibleTab}
        onChange={(e, value) => {
          setVisibleTab(value)
        }}
        aria-label="alerts-tab">
        <Tab label="Analysis" value="list" />
        <Tab label="My Portfolio" value="portfolio" />
      </Tabs>
      {visibleTab === 'list' && <AthResultsList />}
      {visibleTab === 'portfolio' && <AthPortfolio />}
    </Card>
  )
}

export default AthList
