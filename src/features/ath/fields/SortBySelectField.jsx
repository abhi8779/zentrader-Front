import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'

const SortBySelectField = ({ label, value, name, onChange }) => {
  const sortList = [
    {
      label: 'Name',
      value: 'instrument__name'
    },
    {
      label: 'Market Cap',
      value: '-instrument__market_cap'
    },
    {
      label: 'Company Age',
      value: 'instrument__inception_date'
    }
  ]

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="lbl-filter-sort" shrink>
        {label}
      </InputLabel>
      <Select
        name={name}
        value={value || ''}
        onChange={onChange}
        label={label}
        labelId="lbl-filter-sort"
        displayEmpty
        notched>
        <MenuItem value="">None</MenuItem>
        {sortList.map((item) => {
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

export default SortBySelectField
