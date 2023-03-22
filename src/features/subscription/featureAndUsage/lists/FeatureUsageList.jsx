import theme from '@/theme'
import { Box, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'

const FeatureUsageList = ({ subscription }) => {
  const features = useSelector((s) => s.subscriptions?.features)

  const subFeatures = features.filter(
    (x) =>
      x.plan_group.tag === subscription.plan.plan_group.tag &&
      x.feature_type !== 'bool'
  )
  const isCylic =
    subFeatures.filter((x) => x.feature_type === 'cyclic').length > 0
  return (
    <>
      {subFeatures && subFeatures.length > 0 && (
        <Box bgcolor={grey[100]} px={2} py={1}>
          <Typography
            variant="button"
            component="div"
            style={{
              color: theme.palette.primary.light,
              fontWeight: 700,
              marginBottom: 8
            }}>
            Feature Usage
          </Typography>
          {subFeatures.map((f) => (
            <FeatureListItem feature={f} key={f.id} />
          ))}
          {isCylic && (
            <Typography variant="caption" style={{ fontStyle: 'italic' }}>
              *Cycle will reset on{' '}
              {moment(subscription.cycle_end).format('DD MMM YYYY')}
            </Typography>
          )}
        </Box>
      )}
    </>
  )
}

export const FeatureListItem = ({ feature }) => {
  return (
    <Box mb={1} display="flex" justifyContent="space-between">
      <Typography variant="subtitle1">
        {feature.name}
        {feature.feature_type === 'cyclic' && <>*</>}
      </Typography>

      <Typography
        variant="subtitle1"
        style={{ color: grey[600], fontWeight: 500 }}>
        {feature.usage}/{feature.limit}
      </Typography>
    </Box>
  )
}

export default FeatureUsageList
