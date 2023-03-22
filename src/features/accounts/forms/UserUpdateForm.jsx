import FormikDatePicker from '@/components/Formik/FormikDatePicker'
import FormikTextField from '@/components/Formik/FormikTextField'
import LoadingButton from '@/components/LoadingButton'
import ZenApi from '@/services/trader'
import { Grid } from '@material-ui/core'
import { Formik } from 'formik'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { updateUser } from '../slices/userSlice'

const UserUpdateForm = () => {
  const user = useSelector((s) => s.user.user)
  const dispatch = useDispatch()

  const initalValues = {
    first_name: user.first_name,
    last_name: user.last_name,
    dob: user.dob ? moment(user.dob) : null,
    email: user.email
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

  const onSubmit = async (values, { setErrors }) => {
    try {
      const res = await ZenApi.User.update({
        ...values,
        dob: values.dob.format('YYYY-MM-DD')
      })
      dispatch(updateUser(res.data))
      toast.success('User data updated successfulyl')
    } catch (e) {
      console.error(e)
      setErrors(e.response.data)
    }
  }

  return (
    <>
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
                  />
                </Grid>
                <Grid xs={6} item>
                  <FormikTextField
                    label="Last Name"
                    name="last_name"
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} item>
                  <FormikTextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    fullWidth
                    isLoading={isSubmitting}
                    btnText={'Update Details'}
                    loadingText={'Updating Details'}
                  />
                </Grid>
              </>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

export default UserUpdateForm
