// import ConfirmationDialog from "./ConfirmationDialog";
import DialogCloseButton from '@/components/Dialog/DialogCloseButton'
import theme from '@/theme'
import { Box } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import React from 'react'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ConfirmationDialog = ({
  open,
  title,
  message,
  onConfirm,
  onDismiss,
  btnConfirmText,
  btnDismissText
}) => {
  return (
    <Dialog
      open={open}
      onClose={onDismiss}
      TransitionComponent={Transition}
      maxWidth="xs"
      fullWidth>
      <DialogTitle>{title}</DialogTitle>
      {!btnDismissText && <DialogCloseButton onClick={() => onDismiss()} />}
      <DialogContent style={{ marginTop: theme.spacing(1) }}>
        {message}
        <Box display={'flex'} ml={2} mt={2} mb={2}>
          <Box ml="auto">
            {btnDismissText && (
              <Button onClick={onDismiss}>{btnDismissText || 'Cancel'}</Button>
            )}
            <Button color="primary" variant="contained" onClick={onConfirm}>
              {btnConfirmText || 'Confirm'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

const ConfirmationDialogContext = React.createContext({})

const ConfirmationDialogProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [dialogConfig, setDialogConfig] = React.useState({})
  const openDialog = ({
    title,
    message,
    actionCallback,
    btnConfirmText,
    btnDismissText
  }) => {
    setDialogOpen(true)
    setDialogConfig({
      title,
      message,
      actionCallback,
      btnConfirmText,
      btnDismissText
    })
  }

  const resetDialog = () => {
    setDialogOpen(false)
  }

  const onConfirm = () => {
    resetDialog()
    dialogConfig.actionCallback(true)
    setTimeout(function() {
      setDialogConfig({})
    }, 1000)
  }

  const onDismiss = () => {
    resetDialog()
    dialogConfig.actionCallback(false)
  }

  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      <ConfirmationDialog
        open={dialogOpen}
        title={dialogConfig?.title}
        message={dialogConfig?.message}
        btnConfirmText={dialogConfig?.btnConfirmText}
        btnDismissText={dialogConfig?.btnDismissText}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  )
}

const useConfirmationDialog = () => {
  const { openDialog } = React.useContext(ConfirmationDialogContext)

  const getConfirmation = ({ ...options }) =>
    new Promise((resolve) => {
      openDialog({ actionCallback: resolve, ...options })
    })

  return { getConfirmation }
}

function withConfirmationDialog(Component) {
  // ...and returns another component...
  return function WrapperComponent(props) {
    return (
      <ConfirmationDialogContext.Consumer>
        {(state) => <Component {...props} context={state} />}
      </ConfirmationDialogContext.Consumer>
    )
  }
}

export default ConfirmationDialog
export {
  ConfirmationDialogProvider,
  useConfirmationDialog,
  withConfirmationDialog
}
