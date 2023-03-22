import { Card, Box, Link, makeStyles, Typography } from '@material-ui/core'
import DashboardPage from '@/components/DashboardPage'

import BusinessIcon from '@material-ui/icons/Business'
import CallIcon from '@material-ui/icons/Call'
import MailIcon from '@material-ui/icons/Mail'
import React from 'react'

const useStyle = makeStyles((theme) => ({
  privacyCard: {
    // height: '100vh',
    overflow: 'auto',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  title: {
    fontWeight: 700,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const ContactUs = () => {
  const classes = useStyle()
  const preventDefault = (event) => event.preventDefault()
  return (
    <DashboardPage>
      <Card className={classes.privacyCard}>
        <Typography variant="body1">
          Asmita Patel Global School of Trading
        </Typography>
        <Box display="flex" mt={3}>
          <Box mx={2}>
            <BusinessIcon />
          </Box>
          <Typography variant="body1">
            10th Floor, Fairmount, Plot No. 4, Sector 17,
            <br /> Off, Palm Beach Rd, Sanpada,
            <br /> Navi Mumbai, Maharashtra 400705
          </Typography>
        </Box>
        <Box display="flex" mt={3}>
          <Box mx={2}>
            <CallIcon />
          </Box>
          <Typography variant="body1">
            <Link href="tel:+918828888001" onClick={preventDefault}>
              +91 88 288 88001
            </Link>
          </Typography>
        </Box>
        <Box display="flex" mt={3}>
          <Box mx={2}>
            <MailIcon />
          </Box>
          <Typography variant="body1">
            <Link
              href="mailto:connect@asmitapatel.com"
              onClick={preventDefault}>
              connect@asmitapatel.com
            </Link>
          </Typography>
        </Box>
      </Card>
    </DashboardPage>
  )
}

export default ContactUs
