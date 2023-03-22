import { logout } from '@/features/accounts/slices/userSlice'
import api from '@/services/trader'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const getAthInstrumentDetails = createAsyncThunk(
  'athDetail/get',
  async (instrumentId, { rejectWithValue }) => {
    try {
      const res = await api.Ath.Results.get({
        instrument: instrumentId
      })
      return res.data.results
    } catch (e) {
      rejectWithValue(e.data)
    }
  }
)

const athDetailSlice = createSlice({
  name: 'athDetail',
  initialState: {
    isLoading: null,
    instrument: null,
    data: []
  },
  reducers: {
    clearSelectedInstrument: (state) => {
      state = {
        isLoading: null,
        instrument: null,
        data: []
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAthInstrumentDetails.pending, (state) => {
      state.isLoading = true
      state.fetchError = null
    })
    builder.addCase(getAthInstrumentDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false

      if (payload) {
        state.instrument = payload.instrument
        state.data = payload
      }
    })
    builder.addCase(getAthInstrumentDetails.rejected, (state, error) => {
      state.isLoading = false
      state.fetchError = error
    })
    builder.addCase(logout, (state) => {
      state.data = null
    })
  }
})

// Actions
export { getAthInstrumentDetails }
export const { clearSelectedInstrument } = athDetailSlice.actions

// Reducer
export default athDetailSlice.reducer
