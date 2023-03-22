import { Button } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import React from 'react'
import { useHistory } from 'react-router-dom'

const LoginButton = () => {
  const history = useHistory()
  return (
    <Button
      onClick={() => {
        history.push('/login/')
      }}
      variant="contained"
      color="primary"
      endIcon={<ExitToAppIcon />}>
      Login
    </Button>
  )
}

export default LoginButton
