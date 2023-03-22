import logoWhite from '@/assets/images/Option Multiplier.png'
import {
  Card,
  Box,
  Button,
  Grid,
  Link,
  makeStyles,
  Typography
} from '@material-ui/core'
import DashboardPage from '@/components/DashboardPage'
import OmPlan from '@/components/OmPlan'
import ZenApi from '@/services/trader'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  freeWorkshopCard: {
    overflow: 'auto',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))
const FreeWorkshop = () => {
  const classes = useStyles()

  const freeWorkDownloadHandler = () => {
    ZenApi.AutoSheet.Sheet.download()
  }

  return (
    <DashboardPage>
      <Card className={classes.freeWorkshopCard}>
        <Box m={2} mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box ml={5} mt={4}>
                <Typography gutterBottom variant="h2" component="h2">
                  OPTIONS MULTIPLIER
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  ASIA&apos;S MOST POWERFUL STOCK MARKET PROGRAM
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Learn From Full Time Trader, Mentor & Trend follower Ms.
                  Asmita Patel
                </Typography>
                <Box mt={3}>
                  <Link href="https://www.asmitapatel.com/om" underline="none">
                    <Button variant="contained" size="small" color="primary">
                      Know More
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display={'flex'} justifyContent={'center'}>
                <img src={logoWhite} height="300" />
              </Box>
            </Grid>
          </Grid>

          <Box mt={5} mx={5} my={8}>
            <Typography variant="h5" align="center" color="primary">
              About Option Multiplier
            </Typography>
            <Box mt={3}>
              <Typography
                variant="h6"
                color="textSecondary"
                component="p"
                align="center">
                It feels like boasting when we say it, but this is the course
                that has actually changed the lives of so many students. After
                16+ Years of experience as a full-time trader and renowned trend
                follower, Asmita Patel decided to share her wisdom with the
                world. This is a course where she teaches time-tested, proven
                successful, masterful strategies that took countless hours and
                years to stitch together. This is your time to begin <br />
                <br />
                This course includes 6 days of intensive training with Asmita
                Patel - Asia’s No.1 Trader and Mentor. You will learn highly
                actionable strategies that empower you to grow by trading ONLY
                for 15 minutes a day. These 6 days will change the way you look
                at your finances. It will change the way you look at markets. It
                will change the way you trade.
              </Typography>
            </Box>
          </Box>

          <Box mt={5} mx={5} my={5}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="h6" align="center">
                  5 Simple Steps <br /> to Multibagger <br /> Options
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" align="center">
                  Generate <br /> Consistent Monthly <br /> Income
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box mt={5} mx={5} my={8}>
            <Typography variant="h5" align="center" color="primary">
              See Full Feature Plan
            </Typography>

            <Box my={5}>
              <OmPlan />
            </Box>

            <Box border={'1px solid #e0e0e0'} borderRadius={5} p={2}>
              <Typography gutterBottom variant="h5" component="h2">
                Banknifty Automated Sheet
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Thank you for attending the free workshop. You can download the
                resources below.
              </Typography>

              <Box mt={3}>
                <Button
                  onClick={freeWorkDownloadHandler}
                  startIcon={<ArrowDownwardIcon />}
                  variant="contained"
                  color="primary">
                  Download Automated Sheet
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* <Box m={2} display={'flex'} justifyContent={'center'}>
          <Box
            border={`1px solid gray `}
            borderRadius={5}
            width={'800px'}
            display={'flex'}
            flexDirection={'column'}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Free Workshop Resources
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Thank you for attending the free workshop. You can download
                  the resources below.
                </Typography>
              </CardContent>
            </CardActionArea>
            <Box
              ml={2}
              mr={2}
              mb={2}
              display={'flex'}
              justifyContent={'center'}>
              <Button
                onClick={freeWorkDownloadHandler}
                size="small"
                startIcon={<GridOnIcon />}
                variant="contained"
                color="primary">
                Download Resources
              </Button>
            </Box>
          </Box>
        </Box> */}
      </Card>
    </DashboardPage>
  )
}

export default FreeWorkshop
