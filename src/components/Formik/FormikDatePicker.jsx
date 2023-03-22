import MomentUtils from '@date-io/moment'
import { TextField } from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { useField } from 'formik'
import React from 'react'
import 'react-phone-input-material-ui/lib/style.css'

const FormikDatePicker = ({
  name,
  label,
  type = 'text',
  defaultCountry,
  ...props
}) => {
  const [, { value, error, touched }, { setValue, setTouched }] = useField({
    name,
    label
  })
  // const { handleBlur } = useFormikContext()

  const renderInput = (props) => (
    <TextField type="text" size="small" variant="outlined" {...props} />
  )

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          name={name}
          label={label}
          value={value}
          onChange={(value) => {
            setValue(value)
          }}
          onBlur={() => {
            setTouched(true)
          }}
          helperText={error && touched && error}
          error={error && touched}
          inputVariant="outlined"
          TextFieldComponent={renderInput}
          {...props}
        />
      </MuiPickersUtilsProvider>
    </React.Fragment>
  )
}

export default FormikDatePicker
