import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { Formik } from 'formik'
import React from 'react'
import { createGlobalState } from 'react-hooks-global-state'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import config from '../../config'
import FormikNonFieldError from '../Formik/FormikNFError'
import FormikPhoneField from '../Formik/FormikPhoneField'
import FormikSelect from '../Formik/FormikSelect'
import FormikTextField from '../Formik/FormikTextField'
import LoadingButton from '../LoadingButton'
import DialogCloseButton from './DialogCloseButton'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

const { useGlobalState } = createGlobalState({
  reportPopup: {
    open: false
  }
})

function ReportBtnDialog() {
  const classes = useStyles()
  const [{ open }, setConf] = useGlobalState('reportPopup')
  return (
    <>
      <Dialog
        className={classes.modal}
        open={open}
        onClose={() => {
          setConf({ open: false })
        }}
        aria-labelledby="contact-popup">
        <DialogCloseButton
          onClick={() => {
            setConf({ open: false })
          }}
        />

        <FormComponent
          onSucces={() => {
            setConf({ open: false })
          }}
        />
      </Dialog>
    </>
  )
}

const FormComponent = ({ onSucces }) => {
  const user = useSelector((s) => s.user.user)

  const initialValues = {
    name: user ? user.first_name + ' ' + user.last_name : '',
    email: user ? user.email : '',
    phone: user ? user.phone : '',
    issue_type: '',
    description: ''
  }

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm },
    actions
  ) => {
    try {
      await axios.post(config.BASE_URL + '/api/support/ticket/', values)
      resetForm()
      toast.success('Your query has been submitted successfully')
      onSucces()
    } catch (e) {
      console.error(e)
      setErrors(e.response.data)
    }
  }

  const validationSchema = Yup.object().shape({
    phone: Yup.string().label('Phone').required(),
    name: Yup.string().label('Name').required(),
    email: Yup.string().email().label('Email').required(),
    issue_type: Yup.string().label('Issue Type').required(),
    description: Yup.string().label('Message').required().max(1024)
  })

  const useStyles = makeStyles((theme) => ({
    affected: {
      float: 'right'
    },
    email_filed: {
      marginTop: '10px'
    }
  }))
  const classes = useStyles()

  return (
    <>
      <div>
        <DialogTitle>Report an issue</DialogTitle>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <DialogContentText style={{ marginBottom: 16 }}>
                  Please provide details about your issue. We will resolve it as
                  soon as possible
                </DialogContentText>

                <Grid container spacing={2}>
                  <FormikNonFieldError />
                  <Grid item xs={12}>
                    <FormikTextField name="name" label="Full Name" fullWidth />
                  </Grid>
                  <Grid item xs={6}>
                    <FormikTextField
                      className={classes.email_filed}
                      name="email"
                      label="Email Id"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormikPhoneField
                      name="phone"
                      label="Phone Number"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormikSelect
                      name="issue_type"
                      label="Issue Type"
                      shrink
                      fullWidth>
                      <MenuItem disabled value="">
                        Issue Type
                      </MenuItem>
                      {[
                        'Login',
                        'OTP',
                        'Alerts',
                        'Subscription',
                        'Payment',
                        'Unlisted Issue'
                      ].map((item, i) => (
                        <MenuItem value={item} key={i}>
                          {item}
                        </MenuItem>
                      ))}
                    </FormikSelect>
                  </Grid>

                  <Grid item xs={12}>
                    <FormikTextField
                      name="description"
                      label="Message"
                      fullWidth
                      multiline
                      minRows={4}
                      maxRows={20}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <LoadingButton
                  className={classes.affected}
                  color="primary"
                  type="submit"
                  variant="contained"
                  btnText={'Submit'}
                  loadingText={'Submitting'}
                  isLoading={isSubmitting}>
                  Submit Issue
                </LoadingButton>
              </DialogActions>
            </form>
          )}
        </Formik>
      </div>
    </>
  )
}

const useReportBtnDialog = () => {
  const [, setconf] = useGlobalState('reportPopup')
  const showReportBtnDialog = () => setconf({ open: true })

  return { showReportBtnDialog }
}

export default useReportBtnDialog

export { ReportBtnDialog }
