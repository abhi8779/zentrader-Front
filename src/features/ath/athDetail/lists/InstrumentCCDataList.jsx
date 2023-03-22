import EmptyListMessage from '@/components/EmptyListMessage'
import SmallChip from '@/components/SmallChip'
import TrendLblVal from '@/components/TrendLblVal'
import { useFeature } from '@/features/subscription/featureAndUsage/hooks/useFeatureHook'
import theme from '@/theme'
import { Box, Card, Grid, makeStyles, Typography } from '@material-ui/core'
import { blue, green, grey } from '@material-ui/core/colors'
import Step from '@material-ui/core/Step'
import StepContent from '@material-ui/core/StepContent'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  borderDevider: {
    // borderBottom: `1px solid ${grey[500]}`
  }
}))

const InstrumentCCDataList = () => {
  const exchangeList = ['MCC', 'WCC', 'DCC']
  const { getFeature } = useFeature()
  const featAthPro = getFeature('ath_pro')

  return (
    <Grid container spacing={3}>
      {exchangeList.map((exchange) =>
        featAthPro || exchange === 'MCC' ? (
          <InstrumentCCDataItem key={exchange} exchange={exchange} />
        ) : null
      )}
    </Grid>
  )
}

const InstrumentCCDataItem = ({ exchange }) => {
  return (
    <Grid item xs={12} sm={4} style={{ marginTop: theme.spacing(2) }}>
      <InstrumentCCTab candleType={exchange} />
    </Grid>
  )
}

const InstrumentCCTab = ({ candleType }) => {
  const classes = useStyles()
  const ccData = useSelector(
    (s) => s.ath.athDetail.data?.filter((x) => x.version === candleType)[0]
  )

  return (
    <Card>
      <Box p={3}>
        {!ccData && (
          <EmptyListMessage
            text={`No data available for ${candleType} for this instrument`}
          />
        )}
        {ccData && (
          <>
            <Grid container spacing={1}>
              <Grid container>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" mb={3}>
                    <SmallChip
                      label={ccData.version}
                      fontSize={16}
                      bgColor={grey[700]}
                      mr={0.5}
                      fontWeight={700}
                    />
                    <SmallChip
                      label={ccData.status}
                      fontSize={14}
                      bgColor={
                        ccData.status === 'ON'
                          ? theme.palette.primary.main
                          : ccData.status === 'MCC'
                          ? green[500]
                          : grey[500]
                      }
                      mr={0.5}
                      fontWeight={700}
                    />
                    {ccData.trade_status && ccData.trade_status !== 'MCC' && (
                      <SmallChip
                        label={ccData.trade_status}
                        fontSize={14}
                        bgColor={grey[100]}
                        color={
                          ccData.status === 'ON'
                            ? blue[500]
                            : ccData.status === 'MCC'
                            ? green[500]
                            : grey[100]
                        }
                        mr={0.5}
                        fontWeight={700}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <TrendLblVal
                    style={{ marginBottom: theme.spacing(1) }}
                    label="RH"
                    value={ccData.ath}
                    caption={moment(ccData.ath_date).format('Do MMM, YYYY')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TrendLblVal
                    style={{ marginBottom: theme.spacing(1) }}
                    label="CC"
                    value={ccData.cc}
                    caption={moment(ccData.cc_date).format('Do MMM, YYYY')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TrendLblVal
                    style={{ marginBottom: theme.spacing(1) }}
                    label="PSMMA10"
                    value={ccData.moving_avg_10}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TrendLblVal
                    style={{ marginBottom: theme.spacing(1) }}
                    label="PSMMA20"
                    value={ccData.moving_avg_20}
                  />
                </Grid>
              </Grid>
              {Boolean(ccData.entries.length) && (
                <Grid item xs={12} className={classes.borderDevider}>
                  <Grid item xs={12}>
                    <Box mt={2}>
                      <Typography variant="button">Entry Details</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <StepperView actonArray={ccData.entries} />
                  </Grid>
                </Grid>
              )}
              {Boolean(ccData.targets.length) && (
                <Grid className={classes.borderDevider} item xs={12}>
                  <Grid item xs={12}></Grid>
                  <Grid item xs={12}>
                    <Box mt={2}>
                      <Typography variant="button">Target Details</Typography>
                    </Box>
                    <StepperView actonArray={ccData.targets} />
                  </Grid>
                </Grid>
              )}
              {Boolean(ccData.stoplosses.length) && (
                <Grid item xs={12} className={classes.borderDevider}>
                  <Grid item xs={12}>
                    <Box mt={2}>
                      <Typography variant="button">Stoploss Details</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <StepperView actonArray={ccData.stoplosses} />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </>
        )}
      </Box>
    </Card>
  )
}

const StepperView = ({ actonArray }) => {
  const classes = useStyles()

  const [activeStep, setActiveStep] = React.useState(0)

  useEffect(
    () => setActiveStep((prevValue) => prevValue + getLength(actonArray)),
    []
  )
  const getLength = (actonArray) =>
    actonArray.filter((a) => a.status === 'TRIGGERED').length

  return (
    <Box className={classes.root}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        style={{ padding: 0, paddingTop: 16 }}>
        {actonArray.map((action, index) => (
          <Step active={action.status === 'TRIGGERED'} key={action.id}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              <Box display={'flex'}>
                <Box alignItems={'center'}>
                  <Typography variant="subtitle1">{action.name}</Typography>
                  <Typography color="textSecondary" variant="body2">
                    {!action.triggered_at
                      ? ''
                      : moment(action.triggered_at).format('Do MMM, YYYY')}
                  </Typography>
                  <Box display={'flex'}>
                    <Box display={'flex'} alignItems={'center'} mr={1}>
                      <Box display={'flex'} alignItems={'center'} mr={1}>
                        <Typography variant="body2" color="textSecondary">
                          Qty
                        </Typography>
                      </Box>
                      <Box>
                        <Typography align="justify" variant="body2">
                          {action.quantity}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display={'flex'} alignItems={'center'}>
                      <Box display={'flex'} alignItems={'center'} mr={1}>
                        <Typography variant="body2" color="textSecondary">
                          @
                        </Typography>
                      </Box>
                      <Box>
                        <Typography align="justify" variant="body2">
                          {action.trigger}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </StepLabel>
            <StepContent expanded></StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

const CustomStepIcon = (props) => {
  return (
    <Box>
      {props.active ? (
        <CheckCircleIcon color="primary" />
      ) : (
        <CheckCircleIcon style={{ color: grey[500] }} />
      )}
    </Box>
  )
}

export default InstrumentCCDataList
