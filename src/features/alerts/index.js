import AlertsTabContext from '@/features/alerts/contexts/AlertTabsContext'
import { useFeature } from '@/features/subscription/featureAndUsage/hooks/useFeatureHook'
import { useSubscription } from '@/features/subscription/subscriptionManagement/hooks/useSubscriptionHook'
import theme from '@/theme'
import { Box, Card, Grid, makeStyles, useMediaQuery } from '@material-ui/core'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import AvailableComplimentarySubs from '../../components/AvailableComplimentarySubs'
import FeatureUsageExceededAlert from './banners/FeatureUsageExceededAlert'
import TrialOrComplementaryActiveInfo from './banners/TrialOrComplementaryActiveInfo'
import AlertFormDialog from './dialogs/AlertFormDialog'
import AlertForm from './forms/AlertForm'
import AlertsTable from './lists/AlertsTable'
import AlertsTour from './tours/AlertsTour'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    margin: 0,
    overflow: 'hidden'
  },
  height100Flex: {
    height: '100%',
    display: 'flex',

    flexDirection: 'column'
  },
  AlertFormCard: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    display: 'flex',
    overflowY: 'auto',
    overflowX: 'auto'
  }
}))

const AlertsTab = ({ childFunc }) => {
  const classes = useStyles()
  const { getSubscription } = useSubscription()
  const subscription = getSubscription('alerts')
  const { getFeature } = useFeature()
  const trigFeat = getFeature('triggered_alerts')
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)

  return (
    <Grid container spacing={smallScreen ? 0 : 2} className={classes.root}>
      <AlertResponsiveForm />

      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={8}
        className={classes.height100Flex}>
        <Card
          // This id is necessary for the joyride tour
          id="created-alerts"
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
          }}
          // className={classes.height100Flex}
        >
          <FeatureUsageExceededAlert
            subscription={subscription}
            trigFeat={trigFeat}
          />

          <TrialOrComplementaryActiveInfo />

          {isLoggedIn && <AvailableComplimentarySubs planGroup={'alerts'} />}

          <AlertsTable childFunc={childFunc} />
        </Card>
      </Grid>
    </Grid>
  )
}

const AlertResponsiveForm = () => {
  //  AlertResponsiveForm switches between Alert Form Card & Alert Form Dialog based on the screen size
  const classes = useStyles()
  const { hideForm } = useContext(AlertsTabContext)

  return !hideForm ? (
    <Grid
      item
      lg={4}
      className={classes.height100Flex}
      style={{ overflow: 'auto' }}>
      <Card id="alert-form" className={classes.AlertFormCard}>
        <Box>
          <AlertForm />
          <AlertsTour />
        </Box>
      </Card>
    </Grid>
  ) : (
    <>
      <AlertFormDialog />
      <AlertsTour />
    </>
  )
}

export default AlertsTab
