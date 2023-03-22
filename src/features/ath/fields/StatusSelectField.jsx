import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'

function StatusSelectField({ label, value, name, onChange }) {
  const statusList = [
    {
      label: 'CC',
      value: 'CC'
    },
    {
      label: 'ON',
      value: 'ON'
    },
    {
      label: 'NIL',
      value: 'NIL'
    }
  ]

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="lbl-filter-status" shrink>
        {label}
      </InputLabel>
      <Select
        name={name}
        value={value || ''}
        onChange={onChange}
        label={'Status'}
        labelId="lbl-filter-status"
        displayEmpty
        notched>
        <MenuItem value="">All</MenuItem>
        {statusList.map((item) => {
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

export default StatusSelectField
