import ZenApi from '@/services/trader'
import theme from '@/theme'
import capitalizeString from '@/utils/capitalizeString'
import { Box, CircularProgress, Dialog, DialogTitle } from '@material-ui/core'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import React, { useEffect, useState } from 'react'
import { createGlobalState } from 'react-hooks-global-state'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import ErrorMessage from '../../../../components/ErrorMessage'
import SubscriptionSuccessView from '../detail/SubscriptionSuccessView'
import { getSubscriptions } from '../slices/subscriptionSlice'

// This Dialog can be used to activate complementary subscription || Showing success message after any subscription is successfully purchased.
const { useGlobalState } = createGlobalState({
  userCompSubsConfig: {
    open: false,
    id: null,
    allowClose: true,
    planGroup: null
  }
})

const ActivateSubscriptionDialog = () => {
  const [{ open, id, planGroup, allowClose }, setConf] = useGlobalState(
    'userCompSubsConfig'
  )
  const [isloading, setIsloading] = useState(false)
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const [isError, setIsError] = useState()
  const history = useHistory()
  useEffect(() => {
    if (open && id) {
      activatePlan(id)
    }
  }, [open, id])

  const activatePlan = async (id) => {
    const successPathMap = {
      alerts: '/alerts/',
      ath: '/ath/'
    }
    try {
      setIsloading(true)
      await ZenApi.Subscription.UserComplimentarySubs.activate(id)
      toast.success(`The plan is successfully activated`)
      if (pathname.includes(planGroup)) {
        await dispatch(getSubscriptions()).unwrap()
      }

      if (successPathMap[planGroup] && !pathname.includes(planGroup)) {
        history.push(successPathMap[planGroup])
      }
    } catch (e) {
      toast.error(`The plan was not activated`)
      setIsError(e)
      console.error(e)
      setIsloading(false)
    } finally {
      setIsloading(false)
    }
  }

  return (
    open &&
    !isloading && (
      <SuccessDialog
        open={open}
        isError={isError}
        allowClose={allowClose}
        isloading={isloading}
        onCancel={() => {
          setConf({
            open: false,
            planGroup: null,
            allowClose: true
          })
        }}
        planGroup={planGroup}
      />
    )
  )
}

const SuccessDialog = ({
  open,
  isError,
  allowClose,
  onCancel,
  isloading,
  planGroup
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        if (allowClose) {
          onCancel && onCancel()
        }
      }}
      // maxWidth="md"
      scroll="paper"
      PaperProps={{ sx: { overflow: 'visible' } }}
      fullWidth>
      {isloading && <CircularProgress />}
      {isError && <ErrorMessage />}
      <DialogTitle>
        <Box gridGap={theme.spacing(2)} display={'flex'} alignItems="center">
          Successfully Subscribed to {capitalizeString(planGroup)}
          <DoneOutlineIcon color="primary" />
        </Box>
      </DialogTitle>
      <SubscriptionSuccessView planGroup={planGroup} />
    </Dialog>
  )
}

const useActivateSubscriptionDialog = () => {
  const [, setConf] = useGlobalState('userCompSubsConfig')
  const showActivateSubscriptionDialog = (planGroup, id, allowClose = true) => {
    setConf({
      open: true,
      planGroup,
      id,
      allowClose
    })
  }
  return { showActivateSubscriptionDialog }
}

export { useActivateSubscriptionDialog }
export default ActivateSubscriptionDialog
