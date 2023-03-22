import PaddedProgressBar from '@/components/PaddedProgressBar'
import theme from '@/theme'
import { Box, Card } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import InstrumentCCDataList from '../lists/InstrumentCCDataList'
import { getAthInstrumentDetails } from '../slices/athDetailSlice'
import InstrumentDetails from './InstrumentDetails'

const InstrumentCCDetails = () => {
  const { id } = useParams()
  const loading = useSelector((s) => s.ath.athDetail.isLoading)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAthInstrumentDetails(id))
  }, [id])

  return (
    <Box>
      <Card style={{ marginTop: theme.spacing(2) }}>
        {loading && <PaddedProgressBar />}
        {!loading && <InstrumentDetails />}
      </Card>
      <InstrumentCCDataList />
    </Box>
  )
}

export default InstrumentCCDetails
