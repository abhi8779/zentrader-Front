import { combineReducers } from '@reduxjs/toolkit'
import athDetailSlice from '../athDetail/slices/athDetailSlice'
import athPortfolioSlice from '../athPortfolio/slices/athPortfolioSlice'
import athListSlice from '../athResults/slices/athListSlice'

const athReducer = combineReducers({
  athDetail: athDetailSlice,
  athList: athListSlice,
  athPortfolio: athPortfolioSlice
})

export default athReducer
