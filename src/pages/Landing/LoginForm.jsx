import FormikNonFieldError from '@/components/Formik/FormikNFError'
import FormikPhoneField from '@/components/Formik/FormikPhoneField'
import FormikTextField from '@/components/Formik/FormikTextField'
import config from '@/config'
import PasswordResetForm from '@/pages/Landing/PasswordResetForm'
import ZenApi from '@/services/trader'
import { Box, Grid, InputAdornment, Typography } from '@material-ui/core'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import { Alert } from '@material-ui/lab'
import { Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import LoadingButton from '../../components/LoadingButton'
import { authUser } from '../../features/accounts/slices/userSlice'

// const useStyles = makeStyles((theme) => ({
//   marginBottom: {
//     marginBottom: theme.spacing(1)
//   }
// }))

function LoginForm() {
  const dispatch = useDispatch()
  // const isLoading = useSelector((s) => s.user.isAuthenticating)
  // const classes = useStyles()
  const [passwordReset, showPasswordReset] = React.useState(false)
  const [msg, setMsg] = React.useState(false)
  const [counter, setCounter] = React.useState(0)
  const [resending, setResending] = React.useState(0)

  const initalValues = { phone: '', code: '', otpSent: false }
  const errors = useSelector((s) => s.user.authError)
  const validationSchema = Yup.object().shape({
    phone: Yup.string().required('Phone is required'),
    code: Yup.string()
      .label('Code')
      .required()
  })

  const onSubmit = async (values, { setSubmitting }) => {
    dispatch(authUser(values))
  }

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
    return () => clearInterval(timer)
  }, [counter])

  return (
    <>
      {passwordReset ? (
        <PasswordResetForm
          showPasswordReset={showPasswordReset}
          setMsg={setMsg}
        />
      ) : (
        <Formik
          initialValues={initalValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          initialErrors={errors}
          enableReinitialize>
          {({
            handleSubmit,
            setErrors,
            setFieldValue,
            isSubmitting,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {msg && (
                  <Grid xs={12} item>
                    <Alert severity="success">{msg}</Alert>
                  </Grid>
                )}
                {!values.otpSent ? (
                  <>
                    <Grid xs={12} item>
                      <FormikPhoneField label="Phone" name="phone" fullWidth />
                    </Grid>
                    <FormikNonFieldError />
                    <Grid item xs={12}>
                      <LoadingButton
                        startIcon={<WhatsAppIcon />}
                        color="primary"
                        variant="contained"
                        type="button"
                        fullWidth
                        isLoading={isSubmitting}
                        btnText={'Send OTP to WhatsApp'}
                        loadingText={'Sending OTP'}
                        onClick={async () => {
                          try {
                            await ZenApi.Otp.send(values.phone, 'login')
                            setFieldValue('otpSent', true)
                            setCounter(config.RESEND_TIMEOUT)
                          } catch (e) {
                            setErrors(e.response.data)
                          }
                        }}
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid xs={12} item>
                      <Box mb={2}>
                        <Alert severity="success">
                          An OTP has been successfully sent to your{' '}
                          <b>WhatsApp</b> app. Please enter the OTP below to
                          continue.
                        </Alert>
                      </Box>

                      <FormikTextField
                        label="Verification Code"
                        name="code"
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <LoadingButton
                                btnText={'Resend OTP'}
                                loadingText={'Resending OTP'}
                                // isLoading={resending}
                                size="small"
                                variant="text"
                                disabled={resending || counter > 0}
                                onClick={async () => {
                                  try {
                                    setResending(true)
                                    await ZenApi.Otp.send(values.phone, 'login')
                                    setCounter(config.RESEND_TIMEOUT)
                                    setResending(false)
                                  } catch (e) {
                                    setErrors(e.response.data)
                                  }
                                }}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                      {counter > 0 && (
                        <Typography variant="caption">
                          You can resend the OTP in {counter} seconds
                        </Typography>
                      )}
                    </Grid>

                    <FormikNonFieldError />
                    <Grid item xs={12}>
                      <LoadingButton
                        color="primary"
                        variant="contained"
                        type="submit"
                        fullWidth
                        isLoading={isSubmitting}
                        btnText={'Verify OTP'}
                        loadingText={'Verifying OTP'}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
          )}
        </Formik>
      )}
    </>
  )
}

export default LoginForm
