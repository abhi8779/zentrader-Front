import React from 'react'

import theme from '@/theme'
import { Box, Button, Card, Typography, useMediaQuery } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { useHistory } from 'react-router-dom'

function ErrorMessage({
  errorMessage,
  errorStatus,
  errorIcon,
  goBackButton = false
}) {
  const history = useHistory()
  // const errorStatus = error.response.status
  const smallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Card
      style={{
        // border: `1px solid ${grey[200]}`,
        borderRadius: 0,
        padding: theme.spacing(2),
        background: red[400],
        display: 'flex',
        flexDirection: smallScreen ? 'column' : 'row',
        alignItems: smallScreen ? '' : 'center',
        gap: 1,
        justifyContent: 'space-between'
      }}>
      {!errorStatus && (
        <ErrorItem
          errorMessage={errorMessage}
          errorIcon={errorIcon}
          text={` Something went wrong. Please try again later.`}
        />
      )}

      {errorStatus === 400 && (
        <ErrorItem
          errorMessage={errorMessage}
          errorIcon={errorIcon}
          text={` Sorry, there seems to be a problem with the request you sent. Please check your inputs and try again.`}
        />
      )}
      {errorStatus === 401 && (
        <ErrorItem
          errorMessage={errorMessage}
          errorIcon={errorIcon}
          text={`Unauthorized: You need to log in or provide valid credentials to
        access this resource.`}
        />
      )}
      {errorStatus === 403 && (
        <ErrorItem
          errorMessage={errorMessage}
          errorIcon={errorIcon}
          text={`Access Forbidden: You don't have permission to access this
          resource. Please contact the administrator if you believe this is
          a mistake.`}
        />
      )}
      {errorStatus === 500 && (
        <ErrorItem
          errorMessage={errorMessage}
          errorIcon={errorIcon}
          text={` Server Error: Something went wrong on our end. Please try again
            later or contact support if the problem persists.`}
        />
      )}
      {errorStatus === 503 && (
        <ErrorItem
          errorMessage={errorMessage}
          errorIcon={errorIcon}
          text={`Data Unavailable : The server is temporarily
              unable to handle the request. Please try again later.`}
        />
      )}
      {goBackButton && (
        <Button
          size="small"
          style={{
            marginTop: smallScreen ? theme.spacing(2) : 0,
            whiteSpace: 'nowrap',
            minWidth: 'auto'
          }}
          startIcon={<ArrowBackIcon />}
          color="primary"
          variant="outlined"
          onClick={() => history.goBack()}>
          Go To previous page
        </Button>
      )}
    </Card>
  )
}

const ErrorItem = ({ errorMessage, text, errorIcon }) => {
  return (
    <Box
      style={{ display: 'flex', alignItems: 'center', gap: theme.spacing(2) }}>
      {errorIcon || <ErrorOutlineIcon style={{ color: 'white' }} />}
      <Typography variant="body1" style={{ color: 'white' }}>
        {errorMessage || text}
      </Typography>
    </Box>
  )
}

export default ErrorMessage
