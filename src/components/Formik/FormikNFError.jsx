import { FormHelperText, Grid } from '@material-ui/core'
import { useFormikContext } from 'formik'
import React from 'react'
import 'react-phone-input-material-ui/lib/style.css'

const FormikNonFieldError = () => {
  const { errors } = useFormikContext()

  return (
    <React.Fragment>
      {(errors.non_field_errors || errors.detail) && (
        <Grid xs={12} item>
          {errors.non_field_errors && (
            <FormHelperText error>{errors.non_field_errors}</FormHelperText>
          )}
          {errors.detail && (
            <FormHelperText error>{errors.detail}</FormHelperText>
          )}
        </Grid>
      )}
    </React.Fragment>
  )
}

export default FormikNonFieldError
