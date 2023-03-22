import { FormHelperText, makeStyles, TextField } from '@material-ui/core'
import { useField } from 'formik'
import React from 'react'
// import 'react-phone-input-2/lib/style.css'
import MuiPhoneInput from 'react-phone-input-material-ui'
import 'react-phone-input-material-ui/lib/style.css'

const useStyles = makeStyles((theme) => ({
  field: {
    margin: '10px 0'
  },
  countryList: {
    ...theme.typography.body1
  },
  helperText: {
    marginLeft: theme.spacing(2),
    marginTop: -4
  }
}))

const FormikPhoneField = ({
  name,
  label,
  type = 'text',
  size = 'small',
  defaultCountry,
  ...props
}) => {
  const [, { value, error, touched }, { setValue, setTouched }] = useField({
    name,
    label
  })
  // const { handleBlur } = useFormikContext()
  const classes = useStyles()

  return (
    <React.Fragment>
      <MuiPhoneInput
        name={name}
        label={label}
        type={type}
        value={value}
        onChange={(value, country, e, formattedValue) => {
          setValue('+' + value)
        }}
        onBlur={() => {
          setTouched(true)
        }}
        helperText={error && touched && error}
        error={error && touched}
        defaultErrorMessage={error && touched && error}
        inputProps={{
          variant: 'outlined',
          size: size

          // className: classes.field
        }}
        inputClass={classes.field}
        dropdownClass={classes.countryList}
        component={TextField}
        country={'in'}
        enableSearch
        defaultCountry={defaultCountry || 'in'}
        {...props}
      />
      {error && touched && (
        <FormHelperText className={classes.helperText} error>
          {error}
        </FormHelperText>
      )}
    </React.Fragment>
  )
}

export default FormikPhoneField
