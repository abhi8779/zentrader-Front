import AuthView from '@/features/authentication/forms/AuthView'
import { Box, Dialog, DialogContent, makeStyles } from '@material-ui/core'
import React from 'react'
import { createGlobalState } from 'react-hooks-global-state'
import { useSelector } from 'react-redux'

const { useGlobalState } = createGlobalState({ open: false })

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paper': {
      maxWidth: 400
    }
  },
  logo: {
    height: 10
  },
  logoText: {
    height: 35
  }
}))

const AuthDialog = () => {
  const [open, setOpen] = useGlobalState('open')
  const classes = useStyles()
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)

  return (
    <>
      {!isLoggedIn && (
        <Dialog
          open={open}
          onClose={() => {
            setOpen(false)
          }}
          aria-labelledby="auth-popup"
          fullWidth
          className={classes.root}>
          <DialogContent>
            <Box mb={2}>
              <AuthView />
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

const useAuthDialog = () => {
  const [, setOpen] = useGlobalState('open')
  const showAuthDialog = () => {
    setOpen(true)
  }
  return { showAuthDialog }
}

export default useAuthDialog
export { AuthDialog }
