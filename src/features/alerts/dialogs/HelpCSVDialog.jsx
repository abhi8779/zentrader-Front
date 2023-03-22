import api from '@/services/trader'
import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Typography
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import React from 'react'
import { createGlobalState } from 'react-hooks-global-state'
import { useSelector } from 'react-redux'
import DialogCloseButton from '../../../components/Dialog/DialogCloseButton'
import useAuthDialog from '../../authentication/dialogs/AuthDialog'

const HELP_DESCRIPTION = [
  {
    title: 'Exchange:',
    requirement: '[Optional]',
    description: `
    This is the exchange you want to create alert for. 
    Possible values are: 'NSE', 'BSE', 'NFO', 'BCD', 'MCX.'`
  },
  {
    title: 'ScripName:',
    requirement: '[Optional]',

    description: `
    Enter the symbol for the instrument or the underlying symbol if creating alert for future or option.`
  },
  {
    title: ' Expiry:',
    requirement: '[Optional]',

    description: `  
    Enter the expiry of future/option. Leave blank if not applicable. Date format is DD-MM-YYYY. Ex 01-12-2019`
  },
  {
    title: 'Type:',
    requirement: '[Optional]',

    description: `   
    Enter the type of derivative. Leave blank if not applicable. Possible values are: CE, PE, FUT.
    `
  },
  {
    title: ' Strike:',
    requirement: '[Optional]',

    description: ` 
    Enter the strike price if creating alert for options. Leave blank if not applicable.`
  },
  {
    title: '  ScripCode:',
    requirement: '[Optional]',

    description: `Enter the ScripCode or exchange token of the instrument. If this is provided, the other instrument values are ignored. Leave blank if not needed.
    `
  },
  {
    title: 'Condition:',
    requirement: '[Required]',

    description: `Condition when alert should be sent. Possible values are >= and <=
    `
  },
  {
    title: ' Rate:',
    requirement: '[Required]',

    description: `  
    Price at which alert should be sent.
`
  },
  {
    title: ' Message:',
    requirement: '[Optional]',

    description: `  
    Message to be sent in the alert.
`
  }
]

const { useGlobalState } = createGlobalState({
  helpCSV: {
    open: false
  }
})

const HelpCSVDialog = () => {
  const [{ open }, setConf] = useGlobalState('helpCSV')
  const isLoggedIn = useSelector((s) => s.user.isLoggedIn)
  const { showAuthDialog } = useAuthDialog()

  const handleClose = () => {
    setConf({
      open: false
    })
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Bulk Alerts Help</DialogTitle>
        <DialogCloseButton
          onClick={() => {
            setConf({ open: false })
          }}
        />
        <DialogContent>
          <Box>
            <Box mt={2} mb={2}>
              <Typography variant="body2">
                You can easily create bulk alerts by uploading a CSV with the
                relevant details. Below is a brief description of each column
                needed in the CSV. You can also download an example CSV below
                that can be filled in. If you want to create modified version of
                the current active alerts, you can check mark them and export to
                CSV also.
              </Typography>
            </Box>

            {HELP_DESCRIPTION.map((help) => (
              <Box mb={2} key={help.title}>
                <Box display={'flex'} alignItems={'center'}>
                  <Box mr={1}>
                    <Typography style={{ fontWeight: 600 }} variant="body1">
                      {help.title}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography style={{ color: grey[500] }} variant="body2">
                      {help.requirement}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="body2">{help.description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions style={{ borderTop: `1px solid ${grey[300]}` }}>
          <Box m={1}>
            <Button
              size="large"
              onClick={() => {
                if (!isLoggedIn) {
                  showAuthDialog()
                  return
                }
                api.Alerts.Alerts.downloadCsv(
                  { ids: [] },
                  'alerts-csv-template.csv'
                )
                handleClose()
              }}
              variant="contained"
              color="primary">
              Download Template
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const useHelpCSVDialog = () => {
  const [, setConf] = useGlobalState('helpCSV')
  const showHelpCSVDialog = () => {
    setConf({ open: true })
  }
  return { showHelpCSVDialog }
}

export default HelpCSVDialog
export { useHelpCSVDialog }
