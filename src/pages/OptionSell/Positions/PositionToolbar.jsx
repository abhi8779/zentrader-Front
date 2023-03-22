import api from '@/services/trader'
import {
  Button,
  lighten,
  makeStyles,
  Toolbar,
  Typography
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    backgroundColor: lighten(theme.palette.primary.light, 0.85),
    padding: theme.spacing(2),
    display: 'block'
  },
  btnContainer: {
    display: 'flex'
  }
}))

const PositionToolbar = () => {
  const classes = useStyles()
  return (
    <Toolbar className={classes.filterContainer}>
      <Typography variant="body2" gutterBottom>
        Please upload a xls file with the following columns:
        <br />
        <strong>
          EXCHANGE, NET QTY, SCRIP CODE, STRIKE PRICE, EXPIRYDATE, OPTION TYPE
          and NET RATE
        </strong>
      </Typography>
      <div className={classes.btnContainer}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          component="label"
          style={{
            marginRight: 'auto'
          }}>
          Upload CSV
          <input
            type="file"
            hidden
            onChange={(e) => {
              api.ShareKhan.Position.importCsv(e.target.files[0])
            }}
          />
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={async () => {
            api.OptionSell.Position.exportTargetsCsv()
          }}>
          Download Targets
        </Button>
        <ToolBarBtn
          text="Download SL"
          onClick={async () => {
            api.OptionSell.Position.exportSlsCsv()
          }}
        />
      </div>
    </Toolbar>
  )
}

const ToolBarBtn = ({ text, onCLick }) => {
  return (
    <Button
      size="small"
      variant="outlined"
      color="primary"
      onClick={async () => {
        api.ShareKhan.Position.exportSlsCsv()
      }}>
      Download SL
    </Button>
  )
}

export default PositionToolbar
