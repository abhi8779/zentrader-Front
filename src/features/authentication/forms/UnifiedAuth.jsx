import React, { useState } from 'react'
import OtpRequestForm from './OtpRequestForm'
import OtpVerifyForm from './OtpVerifyForm'
import SignupForm from './SignupForm'

const UnifiedAuth = ({ onLogin, title }) => {
  const [otpData, setOtpData] = useState(null)
  const [showSignUp, setShowSignUp] = useState(false)

  return (
    <>
      {!otpData && (
        <OtpRequestForm
          // title={title && 'Verify your phone to login or signup'}
          onSuccess={(data) => {
            setOtpData(data)
          }}
        />
      )}

      {otpData && !showSignUp && (
        <OtpVerifyForm
          reason={otpData.reason}
          phone={otpData.phone}
          onSuccess={(data) => {
            setOtpData(data)
            if (otpData.reason === 'signup') {
              setShowSignUp(true)
            }
          }}
          onBack={() => {
            setOtpData(null)
          }}
        />
      )}

      {otpData && showSignUp && (
        <SignupForm
          otpId={otpData.id}
          phone={otpData.phone}
          onLogin={onLogin}
        />
      )}
    </>
  )
}

export default UnifiedAuth
