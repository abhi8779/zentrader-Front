import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'
import { createGlobalState } from 'react-hooks-global-state'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import DialogCloseButton from '../../../../components/Dialog/DialogCloseButton'
const { useGlobalState } = createGlobalState({
  planLimitPopup: {
    open: false,
    text: '',
    planGroup: null
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paper': {
      maxWidth: 320
    }
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo: {
    height: 50,
    marginBottom: theme.spacing(2)
  },
  logoText: {
    height: 35,
    marginBottom: theme.spacing(2)
  }
}))
const LimitExceedDialog = () => {
  const history = useHistory()

  const [{ open, text, planGroup, onDismiss }, setConf] = useGlobalState(
    'planLimitPopup'
  )

  const classes = useStyles()
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  return (
    <>
      {isLoggedIn && (
        <Dialog
          open={open}
          onClose={() => {
            setConf({ open: false })
            onDismiss && typeof onDismiss === 'function' && onDismiss()
            setConf({ open: false, text: '', planGroup: null, onDismiss: null })
          }}
          aria-labelledby="auth-popup"
          fullWidth
          className={classes.root}>
          <DialogCloseButton
            onClick={() => {
              setConf({ open: false, text: '', planGroup: null })
            }}
          />
          <DialogTitle>Plan Limit Reached</DialogTitle>
          <DialogContent>
            <Box>
              <Box>
                <Alert severity="error">{text}</Alert>
              </Box>

              <Box mt={3} mb={3}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="medium"
                  onClick={() => {
                    if (planGroup) {
                      onDismiss &&
                        typeof onDismiss === 'function' &&
                        onDismiss()

                      history.push(`/plans/${planGroup}/`)
                    }
                    setConf({ open: false, text: '', planGroup: null })
                  }}>
                  view Plans
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

const useLimitExeedDialog = () => {
  const [, setConf] = useGlobalState('planLimitPopup')
  const showLimitExeedDialog = (text, planGroup, onDismiss) => {
    setConf({ open: true, text, planGroup, onDismiss })
  }
  return { showLimitExeedDialog }
}
// text , planGroup passable
export default useLimitExeedDialog
export { LimitExceedDialog }
