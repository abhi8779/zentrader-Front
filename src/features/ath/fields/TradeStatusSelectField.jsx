import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'

function TradeStatusSelectField({
  name,
  value,
  statusMap,
  label,
  onChange,
  status
}) {
  const tradeStatusList = [
    {
      label: 'NIL',
      value: 'NIL'
    },
    {
      label: 'Entry',
      value: 'Entry'
    },
    {
      label: 'Target 1 Triggered',
      value: 'Target 1'
    },
    {
      label: 'Target 2 Triggered',
      value: 'Target 2'
    },
    {
      label: 'Target 3 Triggered',
      value: 'Target 3'
    },
    {
      label: 'Target 4 Triggered',
      value: 'Target 4'
    },
    {
      label: 'Target 5 Triggered',
      value: 'Target 5'
    }
  ].filter((x) => Boolean(x))

  const tradeStatuses = tradeStatusList.filter((s) =>
    status
      ? statusMap[status].includes(s.value)
      : statusMap.All.includes(s.value)
  )

  return (
    <FormControl
      fullWidth
      disabled={status === 'NIL' || status === 'DCC' || status === 'MCC'}
      variant="outlined"
      size="small">
      <InputLabel id="lbl-filter-trade_status" shrink>
        {label}
      </InputLabel>
      <Select
        name={name}
        value={value || ''}
        onChange={onChange}
        label={label}
        labelId="lbl-filter-trade_status"
        displayEmpty
        notched>
        <MenuItem value="">All</MenuItem>
        {tradeStatuses.map((item) => {
          return (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default TradeStatusSelectField
