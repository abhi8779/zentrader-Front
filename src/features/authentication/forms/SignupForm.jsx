import FormikDatePicker from '@/components/Formik/FormikDatePicker'
import FormikTextField from '@/components/Formik/FormikTextField'
import LoadingButton from '@/components/LoadingButton'
import config from '@/config'
import { postSignup } from '@/features/accounts/slices/userSlice'
import { Grid, makeStyles } from '@material-ui/core'
import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(1)
  }
}))

function SignupForm({ otpId, phone }) {
  const dispatch = useDispatch()
  const classes = useStyles()

  const initalValues = {
    first_name: '',
    last_name: '',
    dob: null,
    email: ''
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid Email')
      .label('Email')
      .required(),
    dob: Yup.date()
      .label('Date of birth')
      .required(),
    first_name: Yup.string()
      .label('First Name')
      .matches(/^[A-Za-z .]*$/, 'Please enter a valid first name')
      .max(40)
      .required(),
    last_name: Yup.string()
      .label('Last Name')
      .matches(/^[A-Za-z .]*$/, 'Please enter a valid last name')
      .max(40)
      .required()
  })

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await axios.post(config.BASE_URL + '/api/user/signup/', {
        ...values,
        dob: values.dob.format('YYYY-MM-DD'),
        otp_id: otpId,
        phone: phone
      })
      dispatch(postSignup(res.data))
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
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <>
              <Grid xs={6} item>
                <FormikTextField
                  label="First Name"
                  name="first_name"
                  fullWidth
                  className={classes.marginBottom}
                />
              </Grid>
              <Grid xs={6} item>
                <FormikTextField
                  label="Last Name"
                  name="last_name"
                  fullWidth
                  className={classes.marginBottom}
                />
              </Grid>
              <Grid xs={12} item>
                <FormikTextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  className={classes.marginBottom}
                />
              </Grid>
              <Grid xs={12} item>
                <FormikDatePicker
                  label="Date of birth"
                  name="dob"
                  type="date"
                  fullWidth
                  disableFuture
                  openTo="year"
                  format="DD MMM YYYY"
                  views={['year', 'month', 'date']}
                  className={classes.marginBottom}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  isLoading={isSubmitting}
                  btnText={'Sign Up'}
                  loadingText={'Signing Up'}
                />
              </Grid>
            </>
          </Grid>
        </form>
      )}
    </Formik>
  )
}

export default SignupForm
