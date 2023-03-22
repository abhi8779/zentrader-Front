import theme from '@/theme'
import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition'
import React from 'react'
import { createGlobalState } from 'react-hooks-global-state'
import SubscribeView from '../lists/SubscribeView'
const { useGlobalState } = createGlobalState({
  planModalConfig: {
    open: false,
    allowClose: true,
    feature: null
  }
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const PlanDialog = () => {
  const classes = useStyles()
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const [{ open, feature, allowClose }, setConf] = useGlobalState(
    'planModalConfig'
  )
  return (
    open && (
      <div>
        {smallScreen ? (
          <Dialog
            fullScreen
            open={open}
            onClose={() => {
              if (allowClose) {
                setConf({
                  open: false,
                  feature: null,
                  allowClose: true
                })
              }
            }}
            TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => {
                    if (allowClose) {
                      setConf({
                        open: false,
                        feature: null,
                        allowClose: true
                      })
                    }
                  }}
                  aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Plans
                </Typography>
              </Toolbar>
            </AppBar>
            <Box mt={8}>
              <SubscribeView
                planGroup={feature}
                onSubscribeSuccess={() => {
                  setConf({
                    open: false,
                    feature: null,
                    allowClose: true
                  })
                }}
                title="Change/Renew"
              />
            </Box>
          </Dialog>
        ) : (
          <Box minHeight={'600px'} minWidth="500px">
            <Dialog
              open={open}
              onClose={() => {
                if (allowClose) {
                  setConf({
                    open: false,
                    feature: null,
                    allowClose: true
                  })
                }
              }}
              // maxWidth="md"
              scroll="paper"
              PaperProps={{ sx: { overflow: 'visible' } }}>
              <Box minHeight={'500px'} minWidth={'300px'}>
                <SubscribeView
                  planGroup={feature}
                  onSubscribeSuccess={() => {
                    setConf({
                      open: false,
                      feature: null,
                      allowClose: true
                    })
                  }}
                  title="Change/Renew"
                />{' '}
              </Box>
            </Dialog>
          </Box>
        )}
      </div>
    )
  )
}

const usePlanDialog = () => {
  const [, setConf] = useGlobalState('planModalConfig')
  const showPlanDialog = (feature, allowClose = true) => {
    setConf({
      open: true,
      feature,
      allowClose
    })
  }
  return { showPlanDialog }
}

export { usePlanDialog }
export default PlanDialog
