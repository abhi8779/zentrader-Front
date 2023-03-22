import { Button } from '@material-ui/core'
import React, { useContext } from 'react'
import AlertsTabContext from '../contexts/AlertTabsContext'

const CreateAlertsBtn = ({ ...props }) => {
  const { createAlert } = useContext(AlertsTabContext)

  return (
    <Button
      id="alert-form-small"
      size="small"
      variant="contained"
      fullWidth
      color="primary"
      onClick={() => {
        createAlert()
      }}
      {...props}>
      Create Alert
    </Button>
  )
}

export default CreateAlertsBtn
