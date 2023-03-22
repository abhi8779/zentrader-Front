import { CircularProgress, IconButton, Tooltip } from '@material-ui/core'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearSelectedInstrument } from '../slices/athDetailSlice'

const AthDetailButton = ({ instrumentId }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const onClick = () => {
    dispatch(clearSelectedInstrument())
    history.push(`/ath/details/${instrumentId}/`)
    setLoading(true)
  }

  return (
    <>
      {loading ? (
        <CircularProgress
          color="primary"
          size={16}
          style={{ marginLeft: '1rem' }}
        />
      ) : (
        <Tooltip title="View Details">
          <IconButton onClick={onClick}>
            <OpenInNewIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  )
}

export default AthDetailButton
