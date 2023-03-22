import logoWhite from '@/assets/images/ap-logo-black.png'
import UnifiedAuth from '@/components/Auth/UnifiedAuth'
import { Card, Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
    // backgroundColor: theme.palette.primary.main,
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1)
    },
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: theme.spacing(8)
  },
  logo: {
    // height: 50,
    width: 200,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(3),
    maxWidth: 300,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  marginBottom: {
    marginBottom: theme.spacing(1)
  },

  tabs: {
    '& .MuiTabs-flexContainer': {
      borderBottom: '1px solid transparent'
    }
  },
  tab: {
    fontSize: 16,
    '&.Mui-selected': {
      fontWeight: 700
    }
  }
}))

function LandingPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card className={classes.paper}>
        <Grid container>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <img src={logoWhite} className={classes.logo} />
          </Grid>

          <Grid item xs={12}>
            <UnifiedAuth />
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default LandingPage
