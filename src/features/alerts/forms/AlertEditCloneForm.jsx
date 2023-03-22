import ErrorMessage from '@/components/ErrorMessage'
import FormikNonFieldError from '@/components/Formik/FormikNFError'
import FormikNumberField from '@/components/Formik/FormikNumberField'
import FormikTextField from '@/components/Formik/FormikTextField'
import LoadingButton from '@/components/LoadingButton'
import ZenApi from '@/services/trader'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography
} from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import { FormikProvider, useFormik } from 'formik'
import { round } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { getAlerts } from '../slices/alertSlice'

const AlertEditCloneForm = ({ alert, mode, onClose }) => {
  const dispatch = useDispatch()
  const [ltp, setLtp] = useState(null)
  const [ltpIsLoading, setLtpIsLoading] = useState(true)
  const [isError, setISError] = useState(null)
  useEffect(() => {
    getLtp()
  }, [alert])

  const getLtp = async () => {
    try {
      const res = await ZenApi.MarketData.Instrument.get({
        id: alert.instrument.id
      })
      setLtp(res.data.results[0].last_price)
    } catch (e) {
      setISError(e)
    } finally {
      setLtpIsLoading(false)
    }
  }
  const formikBag = useFormik({
    initialValues: {
      instrument: alert.instrument.id,
      trigger_value: alert.trigger_value,
      operator: alert.operator,
      message: alert.message
    },
    onSubmit: async (values, { setErrors }) => {
      try {
        if (mode === 'edit') {
          await ZenApi.Alerts.Alerts.update(alert.id, values)
        } else {
          await ZenApi.Alerts.Alerts.create(values)
        }
        dispatch(getAlerts())
        onClose()
      } catch (e) {
        setErrors(e.response.data)
      }
    },
    validationSchema: Yup.object().shape({
      trigger_value: Yup.number()
        .label('Value')
        .required(),
      operator: Yup.string()
        .label('Condition')
        .required(),
      message: Yup.string()
        .label('Message')
        .max(32)
    })
  })

  if (isError) {
    return <ErrorMessage />
  }

  const { handleSubmit, setFieldValue, values, isSubmitting } = formikBag

  return !ltpIsLoading ? (
    <FormikProvider value={formikBag}>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <InstrumentLabelCard instrument={alert.instrument} ltp={ltp} />
          </Grid>
          <Grid xs={12} item>
            <Divider style={{ marginBottom: 16 }} />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" size="small">
              <FormLabel component="legend">Alert when LTP is</FormLabel>
              <RadioGroup
                row
                aria-label="operator"
                name="operator"
                defaultValue={values.operator}
                value={values.operator}
                onChange={(e) => {
                  setFieldValue('operator', e.target.value)
                  setFieldValue('trigger_value', ltp)
                }}>
                <FormControlLabel
                  value="gte"
                  control={<Radio color="primary" />}
                  label="Above"
                />
                <FormControlLabel
                  value="lte"
                  control={<Radio color="primary" />}
                  label="Below"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box mb={2}>
              <FormikNumberField
                label="Value"
                name="trigger_value"
                onChange={(e) => {
                  const regex = /^\d*(\.\d{0,4})?$/
                  if (regex.test(e.target.value)) {
                    setFieldValue('trigger_value', e.target.value)
                  }
                }}
                min={values.operator === 'gte' ? round(ltp * 1, 2) : null}
                max={values.operator === 'lte' ? round(ltp * 1, 2) : null}
                step={0.0001}
                fullWidth
              />
            </Box>
          </Grid>
          <Grid xs={12} item>
            <Box mb={2}>
              <FormikTextField
                label="Message"
                name="message"
                type="text"
                multiline
                minRows={4}
                fullWidth
              />
            </Box>
          </Grid>

          <Grid xs={12} item style={{ marginBottom: 16 }}>
            <FormikNonFieldError />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              isLoading={isSubmitting}
              btnText={mode === 'create' ? 'Create Alert' : 'Update Alert'}
              loadingText={'Updating Alert'}
              style={{ marginBottom: 16 }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              color="default"
              variant="text"
              onClick={() => {
                onClose()
              }}
              fullWidth>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormikProvider>
  ) : (
    <Box display={'flex'} justifyContent="center">
      <CircularProgress />
    </Box>
  )
}

const InstrumentLabelCard = ({ instrument, ltp }) => {
  const typeLabel = {
    CE: 'CALL',
    PE: 'PUT',
    FUT: 'FUTURE'
  }
  return (
    <Paper>
      <Box p={2} display="flex" alignItems="center">
        <Typography variant="body1" style={{ fontWeight: 700 }}>
          {instrument.name || instrument.tradingsymbol}
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          style={{ fontWeight: 700, marginLeft: 8 }}>
          {typeLabel[instrument.type]}
          {instrument.strike !== 0 && instrument.strike}
        </Typography>
        <Typography
          variant="caption"
          style={{ color: grey[900], marginLeft: 8 }}>
          {instrument.expiry &&
            moment(instrument.expiry.date).format('DD MMM YYYY')}
        </Typography>
        {ltp && (
          <Box
            style={{
              marginLeft: 'auto',
              fontSize: 14,
              color: green[400]
            }}
            display="flex"
            alignItems="center">
            <TrendingUpIcon fontSize="inherit" style={{ marginRight: 8 }} />
            <Typography
              variant="button"
              color="inherit"
              style={{ fontWeight: 700 }}>
              {ltp}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default AlertEditCloneForm
