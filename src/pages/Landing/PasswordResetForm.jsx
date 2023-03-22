import FormikTextField from '@/components/Formik/FormikTextField'
import { Grid, Link, Typography } from '@material-ui/core'
import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import LoadingButton from '../../components/LoadingButton'

function PasswordResetForm({ showPasswordReset, setMsg }) {
  // const isLoading = useSelector((s) => s.user.isAuthenticating)

  const initalValues = {
    new_password1: '',
    new_password2: '',
    otp_id: ''
  }

  const validationSchema = Yup.object().shape({
    new_password1: Yup.string()
      .label('Password')
      .required(),
    new_password2: Yup.string()
      .label('Password')
      .required(),
    otp_id: Yup.string()
      .label('OtpId')
      .required()
  })

  const onSubmit = async (values, { setErrors }) => {
    try {
      const res = await axios.post('/api/user/reset_password/', values)
      setMsg(res.data.detail)
      showPasswordReset(false)
    } catch (e) {
      console.error(e)
      setErrors(e.response.data)
    }
  }

  return (
    <Formik
      initialValues={initalValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ handleSubmit, isSubmitting, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Reset Password
              </Typography>
            </Grid>
            {!values.otp_id ? (
              <FormikOtpView
                label="Please enter a phone number to continue with signup"
                name="otp_id"
                reason="password_reset"
              />
            ) : (
              <>
                <Grid xs={12} item>
                  <FormikTextField
                    label="New Password"
                    type="password"
                    name="new_password1"
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} item>
                  <FormikTextField
                    label="Repeat Password"
                    type="password"
                    name="new_password2"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    fullWidth
                    isLoading={isSubmitting}
                    btnText={'Change Password'}
                    loadingText={'Changing Password'}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <Typography variant="body2">
                <Link
                  href="#"
                  onClick={() => {
                    showPasswordReset(false)
                  }}>
                  Return to login
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  )
}

export default PasswordResetForm
