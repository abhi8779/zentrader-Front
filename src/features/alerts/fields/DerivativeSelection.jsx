import theme from '@/theme'
import { Box, useMediaQuery } from '@material-ui/core'
import React, { useContext } from 'react'
import TypeSelectButton, { TypeSelectInput } from '../buttons/TypeSelectButton'
import InstrumentSearchContext from '../contexts/InstrumentSearchContext'
import FutureList from '../lists/FutureList'
import OptionsList from '../lists/OptionsList'

const DerivativeSelection = ({ useSelectStyleTypeInput = false }) => {
  const { hasDerivatives, instrumentType } = useContext(InstrumentSearchContext)
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  if (!hasDerivatives) {
    return null
  }

  if (useSelectStyleTypeInput) {
    return (
      <Box
        display={'flex'}
        flexDirection={extraSmallScreen ? 'column' : 'row'}
        style={{ gap: theme.spacing(2) }}>
        <TypeSelectInput />
        {instrumentType === 'FUT' && <FutureList />}
        {['CE', 'PE'].includes(instrumentType) && <OptionsList />}
      </Box>
    )
  }

  return (
    <>
      <TypeSelectButton />
      {instrumentType === 'FUT' && <FutureList />}
      {['CE', 'PE'].includes(instrumentType) && <OptionsList />}
    </>
  )
}

export default DerivativeSelection
