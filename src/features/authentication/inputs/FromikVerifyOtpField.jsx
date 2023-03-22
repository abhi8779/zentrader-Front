import FormikTextField from '@/components/Formik/FormikTextField'
import LoadingButton from '@/components/LoadingButton'
import config from '@/config'
import ZenApi from '@/services/trader'
import { Box, FormHelperText, InputAdornment } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const FromikVerifyOtpField = ({ name, label, phone, onError }) => {
  const [counter, setCounter] = useState(config.RESEND_TIMEOUT)
  const [resending, setResending] = useState(0)

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
    return () => clearInterval(timer)
  }, [counter])

  return (
    <>
      <FormikTextField
        label={label}
        name={name}
        type="number"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <LoadingButton
                btnText={'Resend OTP'}
                loadingText={'Resending OTP'}
                // isLoading={resending}
                size="small"
                variant="text"
                disabled={resending || counter > 0}
                onClick={async () => {
                  try {
                    setResending(true)
                    await ZenApi.Otp.send(phone, 'login')
                    setCounter(config.RESEND_TIMEOUT)
                    setResending(false)
                  } catch (e) {
                    onError(e)
                  }
                }}
              />
            </InputAdornment>
          )
        }}
      />
      {counter > 0 && (
        <Box mb={1} ml={2}>
          <FormHelperText>
            You can resend the OTP in {counter} seconds
          </FormHelperText>
        </Box>
      )}
    </>
  )
}

export default FromikVerifyOtpField
