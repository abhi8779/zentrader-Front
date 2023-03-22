import GuidedTour from '@/components/GuidedTour'
import { useSubscription } from '@/features/subscription/subscriptionManagement/hooks/useSubscriptionHook'
import theme from '@/theme'
import { useMediaQuery } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import AlertsTabContext from '../contexts/AlertTabsContext'

const AlertsTour = () => {
  const { getSubscription } = useSubscription()
  const subscription = getSubscription('alerts')
  const [stepIndex, setStepIndex] = useState(0)
  const mediumScreen = useMediaQuery(theme.breakpoints.down('md'))

  const isTrialOrComplimentary =
    subscription?.trial || subscription?.complimentary

  const tourEnd = isTrialOrComplimentary ? 15 : 14
  const { setOpenBulkAlerts, openAlertDialog } = useContext(AlertsTabContext)

  const getSteps = () =>
    [
      mediumScreen && {
        disableBeacon: true,
        target: '#alert-form-small',
        content: (
          <>
            <h3>Alert Form : </h3>
            <p>
              You can create alerts from here and you will get notified on your
              whatsapp number once triggered{' '}
            </p>
          </>
        )
      },
      !mediumScreen && {
        disableBeacon: true,
        target: '#alert-form',
        content: (
          <div>
            <h3>Create</h3>
            <p>Use this form to create alerts</p>
          </div>
        )
      },

      {
        target: '#exchange-select',
        content: 'Select a exchange'
      },
      {
        target: '#search-scrip',
        content: 'Search for scrip using company name or ticker symbol'
      },

      {
        target: '#above-below',
        content: 'Select alert condition'
      },
      {
        target: '#value',
        content: 'Enter trigger value'
      },
      {
        target: '#message',
        content: 'Add an optional message for the alert'
      },
      {
        target: '#create-alert-btn',
        content: 'Submit to create an alert'
      },
      {
        target: '#created-alerts',
        content:
          'Your alerts will be listed here. You can edit or delete alerts from here.'
      },

      {
        target: '#bulk-alert',
        content:
          'You can also create multiple alerts at once by importing a CSV with the correct format'
      },
      {
        target: '#export-csv',
        content: 'Export you created alerts in CSV format'
      },
      {
        target: '#import-csv',
        content: 'Import alerts from CSV from here'
      },
      {
        target: '#import-tt-csv',
        content: 'you can import tt CSV from here'
      },
      {
        target: '#download-template',
        content: 'Download an example CSV that can be filled for import'
      },
      {
        target: '#help',
        content: 'Get more help'
      },
      isTrialOrComplimentary && {
        target: '#banner',
        content: `You are currently on ${subscription?.trial ? 'Trial' : ''}  ${
          subscription?.complimentary ? 'Complimentary' : ''
        } Plan kindly upgrade to a plan to keep using the services `
      }
    ].filter((x) => Boolean(x))

  const callbacks = async (event) => {
    // This step closes the  Alert Form dialog & Bulk Alert Menu before starting the fresh tour.
    if (event.index === 0 && event.type === 'step:before') {
      await openAlertDialog(false)
      await setOpenBulkAlerts(false)
    }
    if (event.index === 0 && event.type === 'step:after' && mediumScreen) {
      await openAlertDialog(true)
    }

    if (event.index === 6 && event.type === 'step:after' && mediumScreen) {
      await openAlertDialog(false)
    }

    if (event.index === 8 && event.type === 'step:after') {
      setOpenBulkAlerts(true)
    }
    if (event.index === 13 && event.type === 'step:after') {
      setOpenBulkAlerts(false)
    }

    if (event.lifecycle === 'complete') {
      setStepIndex((prev) => prev + 1)
    }
  }

  return (
    <GuidedTour
      tourKey="alerts"
      stepIndex={stepIndex}
      endTour={stepIndex === tourEnd}
      steps={getSteps()}
      callbacks={callbacks}
    />
  )
}

export default AlertsTour
