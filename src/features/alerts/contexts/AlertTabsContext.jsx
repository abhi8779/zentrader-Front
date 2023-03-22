import { useMediaQuery, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import AlertCloneEditDialog from '../dialogs/AlertCloneEditDialog'

const AlertsTabContext = React.createContext({})

const AlertsTabContextProvider = ({ children }) => {
  const [dialogOpen, openAlertDialog] = React.useState(false)
  const [selectedAlert, setSelectedAlert] = React.useState(null)
  const [update, setUpdate] = React.useState(false)
  const [editConfig, setEditConfig] = React.useState({
    mode: null,
    alert: null
  })
  const [openBulkAlerts, setOpenBulkAlerts] = useState(false)
  const theme = useTheme()
  const hideForm = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true })

  const editAlert = (alert) => {
    setEditConfig({
      mode: 'edit',
      alert: alert
    })
  }

  const cloneAlert = (alert) => {
    setEditConfig({
      mode: 'create',
      alert: alert
    })
  }

  const createAlert = () => {
    setSelectedAlert(null)
    setUpdate(false)
    openAlertDialog(true)
  }

  return (
    <AlertsTabContext.Provider
      value={{
        openAlertDialog,
        dialogOpen,
        hideForm,
        selectedAlert,
        setSelectedAlert,
        update,
        setUpdate,

        openBulkAlerts,
        setOpenBulkAlerts,

        editAlert,
        cloneAlert,
        createAlert
      }}>
      {children}
      <AlertCloneEditDialog
        alert={editConfig.alert}
        mode={editConfig.mode}
        onClose={() => {
          setEditConfig({
            mode: null,
            alert: null
          })
        }}
      />
    </AlertsTabContext.Provider>
  )
}

export default AlertsTabContext
export { AlertsTabContextProvider }
