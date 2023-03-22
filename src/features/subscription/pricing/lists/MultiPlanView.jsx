import PaddedProgressBar from '@/components/PaddedProgressBar'
import { updateAccessToken } from '@/features/accounts/slices/userSlice'
import api from '@/services/trader'
import { Box, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import featuresConfig from '../../featureAndUsage/featuresConfig'
import MultipleInput from './components/MultipleInput'
import PlanCard from './components/PlanCard'
import PlanTableData from './components/PlanTableData'

const useStyles = makeStyles((theme) => ({
  featureTitleCell: {
    textAlign: 'left',
    fontSize: 14,
    backgroundColor: grey[100],
    padding: theme.spacing(1),
    borderTop: `1px solid ${grey[300]}`,
    borderLeft: `1px solid ${grey[300]}`,
    fontWeight: 500
  }
}))

const MultiPlanView = ({
  planGroup,
  subscription,
  discount,
  onSubscribeSuccess
}) => {
  const [plans, setPlans] = useState(null)
  const [month, setMonth] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchPlans()
  }, [planGroup])

  const fetchPlans = async () => {
    try {
      setIsLoading(true)
      const res = await api.Subscription.Plan.get({
        plan_group__tag: planGroup,
        expand: 'plan_features,billing_plans'
      })
      setPlans(res.data.results)
    } catch (error) {
      console.warn(error)
    } finally {
      setIsLoading(false)
    }
  }

  const monthSet = new Set()
  plans?.forEach((pl) => {
    pl.billing_plans.forEach((bp) => {
      monthSet.add(bp.interval_months)
    })
  })
  const months = [...monthSet].sort((a, b) => b - a).filter((x) => Boolean(x))

  if (isLoading) {
    return <PaddedProgressBar />
  }

  return (
    <Box textAlign="center">
      <Typography
        onClick={() => {
          updateAccessToken()
        }}
        variant="body2">
        Select a plan to continue
      </Typography>

      {plans && (
        <Box mt={2} mb={2}>
          <MultipleInput
            months={months}
            onChange={(month) => {
              setMonth(month)
            }}
          />
        </Box>
      )}

      <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
        <Table
          plans={plans}
          months={months}
          onSubscribeSuccess={onSubscribeSuccess}
          month={month}
          subscription={subscription}
          planGroup={planGroup}
          discount={discount}
        />
      </Box>
    </Box>
  )
}

const Table = ({
  plans,
  months,
  onSubscribeSuccess,
  month,
  subscription,
  planGroup,
  discount
}) => {
  const classes = useStyles()

  return (
    <table cellSpacing="0" className={classes.table}>
      <thead>
        <tr>
          <th></th>
          {plans &&
            plans.map((plan) => (
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
        {plans &&
          featuresConfig[planGroup].map((feat) => (
            <tr className={classes.featureRow} key={feat.label}>
              <td className={classes.featureTitleCell}>{feat.label}</td>
              {plans.map((plan) => {
                if (
                  plan.billing_plans.find((p) => p.interval_months === month) ||
                  plan.name === 'Free'
                ) {
                  return <PlanTableData key={plan.id} feat={feat} plan={plan} />
                } else {
                  return null
                }
              })}
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default MultiPlanView
