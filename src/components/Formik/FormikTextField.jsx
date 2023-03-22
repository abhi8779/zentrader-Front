import { TextField } from '@material-ui/core'
import { useField, useFormikContext } from 'formik'
import React, { Fragment } from 'react'

const FormikTextField = ({ name, label, type = 'text', ...props }) => {
  const [, { value, error, touched }, { setValue }] = useField({ name, label })
  const { handleBlur } = useFormikContext()

  // format error
  let formattedError = error
  if (Array.isArray(error)) {
    formattedError = (
      <>
        {error.map((l, i) => (
          <Fragment key={i}>
            {l} <br />
          </Fragment>
        ))}
      </>
    )
  }

  return (
    <TextField
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      onBlur={handleBlur}
      helperText={error && touched && formattedError}
      error={error && touched}
      variant="outlined"
      size="small"
      {...props}
    />
  )
}
export default FormikTextField
