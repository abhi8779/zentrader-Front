import React from 'react'

const ListFilters = ({ setFilters, renderFilters }) => {
  const updateFilter = (key, value) => {
    setFilters((prevVal) => {
      const state = { ...prevVal }

      if (!value) {
        delete state[key]
      } else {
        state[key] = value
      }

      return state
    })
  }

  return <>{renderFilters?.(updateFilter)}</>
}

export default ListFilters
