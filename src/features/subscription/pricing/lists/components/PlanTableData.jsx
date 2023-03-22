import { makeStyles } from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  featureCell: {
    borderTop: `1px solid ${grey[300]}`,
    borderLeft: `1px solid ${grey[300]}`,
    borderRight: `1px solid ${grey[300]}`,
    padding: theme.spacing(1),
    fontWeight: 700
  },

  checkIcon: {
    color: green[500],
    fontSize: 16
  },
  crossIcon: {
    color: grey[300],
    fontSize: 16
  }
}))

const PlanTableData = ({ feat, plan }) => {
  const classes = useStyles()

  if (feat.feature) {
    const pf = plan.plan_features.filter((x) =>
      feat.feature.includes(x.feature_name)
    )[0]
    if (pf) {
      return (
        <td key={plan.name} className={classes.featureCell}>
          {pf.limit ? (
            pf.limit
          ) : (
            <CheckCircleIcon className={classes.checkIcon} />
          )}
        </td>
      )
    } else {
      return (
        <td key={plan.name} className={classes.featureCell}>
          <CancelIcon className={classes.crossIcon} />
        </td>
      )
    }
  } else {
    return (
      <td key={plan.name} className={classes.featureCell}>
        <CheckCircleIcon className={classes.checkIcon} />
      </td>
    )
  }
}

export default PlanTableData
