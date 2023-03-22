import { Box, Button, Divider, Grid, Typography } from '@material-ui/core'
import { grey, red } from '@material-ui/core/colors'
import { Alert, AlertTitle } from '@material-ui/lab'
import fileDownload from 'js-file-download'
import React from 'react'
const ErrorsTable = ({ errors }) => {
  const downloadFailedCsv = () => {
    const rows = [
      [
        'Exchange',
        'ScripName',
        'ScripCode',
        'Rate',
        'Condition',
        'Message',
        'Error'
      ]
    ]
    errors.map(({ row, errors }) => {
      let errText = ''
      for (const key in errors) {
        if (Object.hasOwnProperty.call(errors, key)) {
          errText += `"${key}: ${errors[key]}"`
        }
      }
      rows.push([
        row.Exchange,
        row.ScripName,
        row.ScripCode,
        row.Rate,
        row.Condition,
        row.Message,
        errText
      ])
      return null
    })

    let csvContent = ''
    rows.forEach(function(rowArray) {
      const row = rowArray.join(',')
      csvContent += row + '\r\n'
    })

    fileDownload(csvContent, 'failed-alerts.csv')
  }

  return (
    <Grid container>
      <Alert severity="error">
        <AlertTitle>
          {errors.length} alerts failed to import. Please download the failed
          Alert CSV, make corrections and upload again.
          <br />
          <br />
          <Box color={red[500]}>
            <Button
              onClick={downloadFailedCsv}
              variant="outlined"
              color="inherit"
              size="small">
              Download failed alerts CSV
            </Button>
          </Box>
        </AlertTitle>
      </Alert>

      <Box bgcolor={grey[100]} width="100%" py={2} px={1} my={2}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            Exchange
          </Grid>
          <Grid item xs={6}>
            ScripName
          </Grid>
          <Grid item xs={2}>
            Rate
          </Grid>
          <Grid item xs={2}>
            Condition
          </Grid>
        </Grid>
      </Box>
      {errors &&
        errors.map((error, i) => (
          <Box key={i} px={1} pb={2} width="100%">
            <Divider style={{ marginBottom: 16 }} />
            <Grid container spacing={1}>
              <Grid item xs={2}>
                {error.row.Exchange}
              </Grid>
              <Grid item xs={6}>
                {error.row.ScripName}
              </Grid>
              <Grid item xs={2}>
                {error.row.Rate}
              </Grid>
              <Grid item xs={2}>
                {error.row.Condition}
              </Grid>
              {/* <Grid item xs>
                {error.row.Message}
              </Grid> */}
              <Grid item xs={12}>
                {Object.keys(error.errors).map((key, i) => (
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    key={i}
                    component="div">
                    {key}: {error.errors[key]}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Box>
        ))}
    </Grid>
  )
}

export default ErrorsTable
