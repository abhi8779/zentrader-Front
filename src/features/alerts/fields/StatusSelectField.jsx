import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'

const StatusSelectField = ({ selectedStatus, onChange }) => {
  return (
    <FormControl fullWidth size="small" variant="outlined">
      <InputLabel id="filter-status-label">Status</InputLabel>
      <Select
        labelId="filter-status-label"
        id="filter-status"
        label="Status"
        value={selectedStatus}
        onChange={onChange}>
        <MenuItem value={'all'}>All</MenuItem>
        <MenuItem value={'active'}>Active</MenuItem>
        <MenuItem value={'triggered'}>Triggered</MenuItem>
      </Select>
    </FormControl>
  )
}

export default StatusSelectField
