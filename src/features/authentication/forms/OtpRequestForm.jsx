import FormikPhoneField from '@/components/Formik/FormikPhoneField'
import LoadingButton from '@/components/LoadingButton'
import ZenApi from '@/services/trader'
import { Grid, Typography, useTheme } from '@material-ui/core'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import { Formik } from 'formik'
import React from 'react'
import 'react-phone-input-material-ui/lib/style.css'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const OtpRequestForm = ({ label, reason, onSuccess, title }) => {
  const theme = useTheme()
  const initalValues = {
    phone: '',
    code: '',
    reason: reason
  }

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .label('Phone')
      .required()
  })

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await ZenApi.Otp.send(values.phone, reason)
      onSuccess && typeof onSuccess === 'function' && onSuccess(res.data)
      toast.success(`Otp Sent Successfully`)
    } catch (e) {
      console.error(e)
      setErrors(e.response.data)
      toast.error(`Otp Not Sent!`)
    }
  }

  return (
    <Formik
      initialValues={initalValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ handleSubmit, isSubmitting, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            {title && (
              <Typography
                variant="body1"
                style={{
                  marginBottom: 16,
                  fontWeight: 500
                }}>
                {title}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <FormikPhoneField
              label="Phone"
              name="phone"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: theme.spacing(1) }}>
            <LoadingButton
              startIcon={<WhatsAppIcon />}
              color="primary"
              variant="contained"
              fullWidth
              isLoading={isSubmitting}
              btnText={'Send OTP To WhatsApp'}
              loadingText={'Sending OTP'}
              onClick={handleSubmit}
              size="large"
              type="submit"
            />
          </Grid>
        </form>
      )}
    </Formik>
  )
}

export default OtpRequestForm
