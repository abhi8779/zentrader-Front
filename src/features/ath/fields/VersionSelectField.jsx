import SmallChip from '@/components/SmallChip'
import { useFeature } from '@/features/subscription/featureAndUsage/hooks/useFeatureHook'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import React from 'react'

function VersionSelectField({ label, value, onChange, name }) {
  const { getFeature } = useFeature()
  const featAthPro = getFeature('ath_pro')

  const versionList = [
    {
      label: 'MCC',
      value: 'MCC'
    },
    {
      label: 'WCC',
      value: 'WCC',
      disabled: !featAthPro
    },
    {
      label: 'DCC',
      value: 'DCC',
      disabled: !featAthPro
    }
  ]

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="lbl-filter-sort" shrink>
        {label}
      </InputLabel>
      <Select
        value={value}
        name={name}
        onChange={onChange}
        label={'version'}
        labelId="lbl-version"
        renderValue={(selected) => selected.join(', ')}
        displayEmpty
        multiple
        notched>
        {versionList.map((item) => {
          return (
            <MenuItem
              key={item.value}
              value={item.value}
              disabled={item.disabled}>
              <Box display="flex" justifyContent="space-between" width="100%">
                {item.label}
                {item.disabled && (
                  <SmallChip
                    label={'PRO'}
                    bgColor={grey[500]}
                    style={{
                      marginLeft: 8
                    }}
                  />
                )}
              </Box>
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default VersionSelectField
