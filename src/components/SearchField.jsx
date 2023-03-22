import { InputAdornment, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'

function SearchField({ value, label, onChange, name, placeholder, ...props }) {
  return (
    <TextField
      name={name}
      label={label}
      fullWidth
      variant="outlined"
      size="small"
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  )
}

export default SearchField
