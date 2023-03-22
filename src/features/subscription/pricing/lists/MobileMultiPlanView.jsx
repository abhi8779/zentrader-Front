import PaddedProgressBar from '@/components/PaddedProgressBar'
import { updateAccessToken } from '@/features/accounts/slices/userSlice'
import api from '@/services/trader'
import { Box, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MultipleInput from './components/MultipleInput'
import PlanTable from './components/PlanTable'

const MobileMultiPlanView = ({
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
        <Box
          display={'flex'}
          flexDirection="column"
          justifyContent={'center'}
          alignItems="center">
          {plans?.map((plan) => {
            return (
              <PlanTable
                key={plan.id}
                plan={plan}
                onSubscribeSuccess={onSubscribeSuccess}
                months={months}
                month={month}
                subscription={subscription}
                planGroup={planGroup}
                discount={discount}
              />
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default MobileMultiPlanView
