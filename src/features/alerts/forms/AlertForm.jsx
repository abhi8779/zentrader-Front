import ErrorMessage from '@/components/ErrorMessage'
import FormikNonFieldError from '@/components/Formik/FormikNFError'
import FormikNumberField from '@/components/Formik/FormikNumberField'
import FormikTextField from '@/components/Formik/FormikTextField'
import LoadingButton from '@/components/LoadingButton'
import AlertsTabContext from '@/features/alerts/contexts/AlertTabsContext'
import {
  clearErrors,
  createAlert,
  updateAlert
} from '@/features/alerts/slices/alertSlice'
import useAuthDialog from '@/features/authentication/dialogs/AuthDialog'
import useLimitExeedDialog from '@/features/subscription/featureAndUsage/dialogs/LimitExceedDialog'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup
} from '@material-ui/core'
import { Formik } from 'formik'
import { round } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import InstrumentSearch from '../fields/InstrumentSearch'

const AlertForm = ({ onSuccess }) => {
  const dispatch = useDispatch()
  const errors = useSelector((s) => s.alert.createUpdateError)
  const [searchError, setSearchError] = useState()
  const loading = useSelector((s) => s.alert.isCreatingUpdating)
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const { showLimitExeedDialog } = useLimitExeedDialog()
  const { showAuthDialog } = useAuthDialog()
  const [ltp, setLtp] = useState(null)
  const {
    selectedAlert,
    postSubmit,
    setSelectedAlert,
    update = false,
    setUpdate
  } = useContext(AlertsTabContext)

  useEffect(() => {
    if (errors?.status === 422) {
      showLimitExeedDialog(errors?.data.detail, 'alerts', () => {
        dispatch(clearErrors())
      })
    }
  }, [errors])

  const alert = selectedAlert

  let initalValues = {
    instrument: null,
    trigger_value: 0,
    operator: 'gte',
    message: ''
  }

  if (alert) {
    initalValues = {
      instrument: alert.instrument,
      trigger_value: alert.trigger_value,
      operator: alert.operator,
      message: alert.message
    }
  }

  const validationSchema = Yup.object().shape({
    instrument: Yup.string()
      .nullable()
      .label('Instrument')
      .required(),
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

  const getPayloadFromValues = (values) => {
    return {
      ...values
    }
  }

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!isLoggedIn) {
      showAuthDialog()
      return
    }
    if (alert && update) {
      dispatch(
        updateAlert({ id: alert.id, payload: getPayloadFromValues(values) })
      )
        .unwrap()
        .then((res) => {
          toast.success(`1 alert created`)
          onSuccess?.()
        })
        .catch((e) => toast.error(`Something went wrong`))
      setSelectedAlert(null)
      setUpdate(false)
    } else {
      dispatch(createAlert(getPayloadFromValues(values)))
        .unwrap()
        .then((res) => {
          toast.success(`1 alert created`)
          onSuccess?.()
        })
        .catch((e) => toast.error(`Something went wrong`))
    }
    setLtp(0)

    if (postSubmit) {
      postSubmit()
    }
  }

  return (
    <>
      <Formik
        initialValues={initalValues}
        validationSchema={validationSchema}
        initialErrors={errors?.data}
        enableReinitialize
        onSubmit={onSubmit}>
        {({ handleSubmit, isSubmitting, setFieldValue, resetForm, values }) => (
          <form onSubmit={handleSubmit}>
            <FormResetter
              loading={loading}
              errors={errors?.data}
              resetForm={resetForm}
            />
            <Grid container spacing={1}>
              <Grid xs={12} item>
                {searchError && (
                  <Box mb={1}>
                    <ErrorMessage
                      // errorMessage={searchError?.data?.detail}
                      errorStatus={searchError?.status}
                      goBackButton={false}
                    />
                  </Box>
                )}
                <Box mb={2}>
                  <InstrumentSearch
                    onError={(error) => {
                      setSearchError(error)
                    }}
                    label="Instrument"
                    name="instrument"
                    instrumentToPop={alert?.instrument}
                    ltpToPop={alert?.trigger_value}
                    setLtp={setLtp}
                    resetForm={resetForm}
                    onSelect={(value) => {
                      setFieldValue('instrument', value?.id)
                    }}
                    onTriggerValueChange={(value) => {
                      setFieldValue('trigger_value', value)
                    }}
                    value={values.instrument}
                  />
                </Box>
              </Grid>
              <Grid xs={12} item>
                <Divider style={{ marginBottom: 16 }} />
              </Grid>
              <Grid item xs={12} id="above-below">
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
                <Box mb={2} id="value">
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
                <Box mb={2} id="message">
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

              <Grid xs={12} item>
                <FormikNonFieldError />
              </Grid>

              {!update && (
                <>
                  <Grid item xs={6}>
                    <LoadingButton
                      id="create-alert-btn"
                      color="primary"
                      variant="contained"
                      size="small"
                      type="submit"
                      isLoading={isSubmitting}
                      btnText={'Create Alert'}
                      loadingText={'Creating Alert'}
                      style={{ marginBottom: 16 }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      color="default"
                      size="small"
                      variant="text"
                      // isLoading={isSubmitting}
                      onClick={() => {
                        if (alert) {
                          setSelectedAlert(null)
                        } else {
                          resetForm()
                        }
                      }}
                      fullWidth>
                      Clear Values
                    </Button>
                  </Grid>
                </>
              )}

              {alert && update && (
                <>
                  <Grid item xs={6}>
                    <LoadingButton
                      color="primary"
                      variant="contained"
                      type="submit"
                      isLoading={isSubmitting}
                      btnText={'Update Alert'}
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
                        setUpdate(false)
                      }}
                      fullWidth>
                      Cancel
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

const FormResetter = ({ loading, errors, resetForm }) => {
  useEffect(() => {
    if (!loading && !errors) {
      resetForm()
    }
  }, [loading])
  return null
}

export default AlertForm
