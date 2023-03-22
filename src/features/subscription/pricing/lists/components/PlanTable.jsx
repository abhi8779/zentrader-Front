import featuresConfig from '@/features/subscription/featureAndUsage/featuresConfig'
import { Box, makeStyles } from '@material-ui/core'
import { green, grey } from '@material-ui/core/colors'
import React from 'react'
import PlanCard from './PlanCard'
import PlanTableData from './PlanTableData'

const useStyles = makeStyles((theme) => ({
  table: {
    borderBottom: `1px solid ${grey[300]}`
  },
  featureCell: {
    borderTop: `1px solid ${grey[300]}`,
    borderLeft: `1px solid ${grey[300]}`,
    borderRight: `1px solid ${grey[300]}`,
    padding: theme.spacing(1),
    fontWeight: 700
  },
  featureTitleCell: {
    textAlign: 'left',
    fontSize: 14,
    backgroundColor: grey[100],
    padding: theme.spacing(1),
    borderTop: `1px solid ${grey[300]}`,
    borderLeft: `1px solid ${grey[300]}`,
    fontWeight: 500
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

const PlanTable = ({
  plan,
  onSubscribeSuccess,
  months,
  month,
  subscription,
  planGroup,
  discount
}) => {
  const classes = useStyles()

  return (
    <Box mb={2}>
      <table cellSpacing="0" className={classes.table}>
        <thead>
          <tr>
            <th></th>
            {plan &&
              [plan].map((plan) => (
                <PlanCard
                  key={plan.id}
                  months={months}
                  plan={plan}
                  onSubscribeSuccess={onSubscribeSuccess}
                  intervalMonths={month}
                  subscription={subscription}
                  planGroup={planGroup}
                  discount={discount}
                />
              ))}
          </tr>
        </thead>
        <tbody>
          {plan &&
            (plan.billing_plans.find((p) => p.interval_months === month) ||
              plan.name === 'Free') &&
            featuresConfig[planGroup].map((feat) => (
              <tr className={classes.featureRow} key={feat.label}>
                <td className={classes.featureTitleCell}>{feat.label}</td>
                {[plan].map((plan) => {
                  if (
                    plan.billing_plans.find(
                      (p) => p.interval_months === month
                    ) ||
                    plan.name === 'Free'
                  ) {
                    return (
                      <PlanTableData key={plan.id} feat={feat} plan={plan} />
                    )
                  } else {
                    return null
                  }
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </Box>
  )
}

export default PlanTable
