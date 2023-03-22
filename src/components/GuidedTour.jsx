import theme from '@/theme'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme
} from '@material-ui/core'
import localforage from 'localforage'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactJoyride from 'react-joyride'
import { useSelector } from 'react-redux'

const GuidedTour = ({ tourKey, steps, callbacks, stepIndex, endTour }) => {
  const theme = useTheme()
  const [newUser, setNewUser] = useState(false)
  const userId = useSelector((state) => state.user.user?.id)
  const CACHE_KEY = 'tour_conf'
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const [startTour, setStartTour] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    handleInit()
  }, [])

  const handleInit = async () => {
    const conf = (await localforage.getItem(CACHE_KEY)) || {}
    const timeOut = await localforage.getItem('timeout_time')
    const currentTime = moment()

    if (timeOut > currentTime.valueOf()) {
      setCancelled(true)
    }

    if (!conf[tourKey]) {
      conf[tourKey] = []
    }

    setNewUser(!conf[tourKey].includes(userId))
  }

  const onComplete = async () => {
    const conf = (await localforage.getItem(CACHE_KEY)) || {}
    if (!conf[tourKey]) {
      conf[tourKey] = []
    }
    conf[tourKey].push(userId)
    localforage.setItem(CACHE_KEY, conf)
  }

  return (
    <>
      {newUser && isLoggedIn && (
        <>
          {!cancelled && (
            <InitialTourDialog
              startGuidedTour={setStartTour}
              onCancel={() => {
                const timeoutTime = moment()
                timeoutTime.add(1, 'd')
                localforage.setItem('timeout_time', timeoutTime.valueOf())
              }}
            />
          )}

          <ReactJoyride
            styles={{
              options: {
                arrowColor: theme.palette.primary.main,
                backgroundColor: '#fff',
                textAlign: 'left',
                overlayColor: 'rgba(0, 0, 0, 0.4)',
                primaryColor: theme.palette.primary.main,
                textColor: 'black',
                zIndex: 1000000,
                width: '400px'
              },
              tooltipContainer: {
                textAlign: 'left'
              },
              tooltipContent: {
                padding: '0 10px'
              }
            }}
            callback={(value) => {
              callbacks(value)
              if (
                value.action === 'skip' ||
                endTour ||
                value.action === 'close'
              ) {
                setStartTour(false)

                onComplete()
              }
            }}
            showProgress={true}
            showSkipButton={true}
            continuous={true}
            steps={steps}
            stepIndex={stepIndex}
            hideBackButton={true}
            disableOverlayClose={true}
            run={startTour}
            // beaconComponent={CustomBacon}
          />
        </>
      )}
    </>
  )
}

const InitialTourDialog = ({ startGuidedTour, onCancel }) => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogTitle>Take a tour</DialogTitle>
      <DialogContent
        style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(1) }}>
        <Box mb={1}>
          <Typography variant="body1">
            Take a tour of <strong>Price alerts</strong> to get to know the
            basic functionality and learn how to create and receive alerts.
          </Typography>
        </Box>

        <Box ml={'auto'} display="flex" mt={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              handleClose()
              startGuidedTour(true)
            }}>
            Start tour
          </Button>
          <Button
            color="primary"
            style={{ marginLeft: theme.spacing(2) }}
            onClick={() => {
              handleClose()
              onCancel()
            }}>
            Skip for now
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default GuidedTour
