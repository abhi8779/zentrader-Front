import { Box, CircularProgress } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import loadable from 'react-loadable'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import Page from './components/Page'
import HelpCSVDialog from './features/alerts/dialogs/HelpCSVDialog'
import NavigationContext from './features/navigation/contexts/NavigationContext'
import NavigationWrapper from './features/navigation/NavigationWrapper'
import { LimitExceedDialog } from './features/subscription/featureAndUsage/dialogs/LimitExceedDialog'
import PlanDialog from './features/subscription/pricing/dialogs/PlanDialog'
import ActivateUserCompSubsDialog from './features/subscription/subscriptionManagement/dialogs/ActivateSubscriptionDialog'
import { getSubscriptions } from './features/subscription/subscriptionManagement/slices/subscriptionSlice'

const AccountPage = loadable({
  loader: () =>
    import(/* webpackChunkName: "account-page" */ './pages/Account'),
  loading: () => (
    <Box margin="auto">
      <CircularProgress />
    </Box>
  )
})

const LoginPage = loadable({
  loader: () => import(/* webpackChunkName: "login-page" */ './pages/Login'),
  loading: () => (
    <Box margin="auto">
      <CircularProgress />
    </Box>
  )
})

function Routes() {
  const dispatch = useDispatch()
  const { filteredMenu, bottomMenu } = useContext(NavigationContext)
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const isLoading = useSelector((s) => s.subscriptions.isLoading)
  const subscriptions = useSelector((s) => s.subscriptions.subscriptions)
  const routesData = filteredMenu
    .flatMap((filteredMenu) => filteredMenu.items)
    .filter((x) => Boolean(x))
    .map((d) => ({
      label: d.label,
      path: d.path,
      component: d.component
    }))

  useEffect(() => {
    if (isLoggedIn && !subscriptions) {
      dispatch(getSubscriptions())
    }
  }, [isLoggedIn, subscriptions])

  return (
    <NavigationWrapper>
      {(!isLoading || !isLoggedIn) && (
        <Switch>
          {!isLoggedIn && (
            <Route
              path={`/login/`}
              render={(props) => (
                <Page title="Login">
                  <LoginPage {...props} />
                </Page>
              )}
            />
          )}

          {routesData.map((data) => (
            <Route
              path={`${data.path}`}
              key={data.label}
              render={(props) => (
                <Page title={data.label}>{data.component(props)}</Page>
              )}
            />
          ))}

          {bottomMenu.map((data) => (
            <Route
              path={`${data.path}`}
              key={data.label}
              render={(props) => (
                <Page title={data.label}>{data.component(props)}</Page>
              )}
            />
          ))}

          {isLoggedIn && (
            <Route
              path={`/account/`}
              render={(props) => (
                <Page title="Account">
                  <AccountPage {...props} />
                </Page>
              )}
            />
          )}

          <Redirect to={isLoggedIn ? `/alerts/` : `/login/`} />
        </Switch>
      )}
      <LimitExceedDialog />
      <PlanDialog />
      <ActivateUserCompSubsDialog />
      <HelpCSVDialog />
    </NavigationWrapper>
  )
}

export default Routes
