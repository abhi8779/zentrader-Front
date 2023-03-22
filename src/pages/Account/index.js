import DashboardPage from '@/components/DashboardPage'
import theme from '@/theme'
import { Box, Card, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import WhatsAppContacts from '../../features/accounts/details/WhatsAppContacts'
import UserUpdateForm from '../../features/accounts/forms/UserUpdateForm'
import SubscriptionManagement from '../../features/subscription/subscriptionManagement/lists/SubscriptionManagement'

const useStyles = makeStyles((theme) => ({
  scrollerPage: {
    marginTop: theme.spacing(2),
    height: 'calc(100vh - 64px)',
    msOverflowY: 'scroll',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  }
}))

const AccountPage = () => {
  const classes = useStyles()

  return (
    <DashboardPage>
      <Box className={classes.scrollerPage}>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <Card
              style={{
                padding: theme.spacing(2)
                // border: '1px solid rgba(0, 0, 0, 0.12)'
              }}>
              <SectionTitle text="Account Details" />
              <UserUpdateForm />
            </Card>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Card
              style={{
                padding: theme.spacing(2)
              }}>
              <SectionTitle text="WhatsApp Numbers" />
              <WhatsAppContacts />
            </Card>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Card>
              <SubscriptionManagement />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardPage>
  )
}

const SectionTitle = ({ text }) => {
  return (
    <Typography variant="h5" style={{ fontWeight: 700, marginBottom: 16 }}>
      {text}
    </Typography>
  )
}

export default AccountPage
export { SectionTitle }
