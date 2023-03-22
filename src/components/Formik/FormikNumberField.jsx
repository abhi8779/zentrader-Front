import {
  ButtonBase,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  OutlinedInput
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import { useField, useFormikContext } from 'formik'
import { round } from 'lodash'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(1)
  },
  input: {
    '&[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  }
}))

const FormikNumberField = ({
  name,
  label,
  step = 0.01,
  min,
  max,
  ...props
}) => {
  const [, { value, error, touched }, { setValue }] = useField({ name, label })
  const { handleBlur } = useFormikContext()
  const classes = useStyles()
  // format error
  let formattedError = error
  if (Array.isArray(error)) {
    formattedError = (
      <>
        {error.map((l) => (
          <>
            {l} <br />
          </>
        ))}
      </>
    )
  }

  React.useEffect(() => {
    if (min !== null) {
      if (value < min) {
        setValue(min)
      }
    }
    if (max !== null) {
      if (value > max) {
        setValue(max)
      }
    }
  }, [min, max])

  return (
    <FormControl size="small" fullWidth>
      <InputLabel variant="outlined">{label}</InputLabel>
      <OutlinedInput
        name={name}
        label={label}
        type={'number'}
        value={value}
        margin="dense"
        inputProps={{
          step: step,
          className: classes.input,
          min,
          max
        }}
        endAdornment={
          <ButtonBase
            style={{ marginRight: -8, marginLeft: 8 }}
            onClick={() => {
              if (max && value > max) {
                setValue(max)
              } else {
                const result = round(parseFloat(value) + 1, 4)
                if (!max || result < max) {
                  setValue(result)
                }
              }
            }}>
            <AddCircleIcon color="disabled" fontSize="small" />
          </ButtonBase>
        }
        startAdornment={
          <ButtonBase
            style={{ marginRight: 8, marginLeft: -8 }}
            onClick={() => {
              if (min && value < min) {
                setValue(min)
              } else {
                const result = round(parseFloat(value) - 1, 4)
                if (!min || result > min) {
                  setValue(result)
                }
              }
            }}>
            <RemoveCircleIcon color="disabled" fontSize="small" />
          </ButtonBase>
        }
        onChange={(e) => {
          // if ((max && value < max) || (min && value > min))
          setValue(round(e.target.value, 4))
        }}
        onBlur={handleBlur}
        // helperText={error && touched && formattedError}
        error={error && touched}
        variant="outlined"
        className={classes.input}
        fullWidth
        {...props}
      />
      {error && touched && formattedError && (
        <FormHelperText error>{formattedError}</FormHelperText>
      )}
    </FormControl>
  )
}
export default FormikNumberField
