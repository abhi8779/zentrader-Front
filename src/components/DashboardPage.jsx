import AuthView from '@/features/authentication/forms/AuthView'
import {
  Box,
  Card,
  Container,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

const DashboardPage = ({
  title,
  description,
  children,
  pageRoutes,
  loginRequired,
  LoginTitle,
  ...props
}) => {
  // const classes = useStyles()
  const { path } = useRouteMatch()
  const theme = useTheme()
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return !loginRequired || (loginRequired && isLoggedIn) ? (
    <>
      <Container
        style={{
          // background: '#efefef',
          height: 'calc(100vh - 64px)',
          overflow: 'auto',
          display: 'flex',
          padding: smallScreen ? 0 : '',
          flexDirection: 'column'
        }}>
        {/* <PageHeader title={title} description={description} /> */}
        {/* Render page routes as needed */}
        {pageRoutes ? (
          <Switch>
            {pageRoutes.map((rt) => (
              <Route
                key={rt.path}
                path={path + rt.path}
                exact={rt.exact}
                render={rt.render}
              />
            ))}
            {/* Redirect to first route if needed */}
            <Redirect to={path + pageRoutes[0].path} />
          </Switch>
        ) : (
          children
        )}
      </Container>
    </>
  ) : (
    <Box display={'flex'} justifyContent="center" mt={2}>
      <Card
        style={{
          padding: theme.spacing(4),
          width: '400px'
        }}>
        <AuthView title={LoginTitle} />
      </Card>
    </Box>
  )
}

export default DashboardPage
