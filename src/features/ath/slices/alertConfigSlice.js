import api from '@/services/trader'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const getAlertConfig = createAsyncThunk(
  'alertconfig/get',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.Alerts.AlertConfig.get()
      return res.data.results
    } catch (e) {
      rejectWithValue(e.data)
    }
  }
)

const updateAlertConfig = createAsyncThunk(
  'alertconfig/update',
  async (data, { rejectWithValue, getState, dispatch }) => {
    const state = getState()
    try {
      const res = await api.Alerts.AlertConfig.update(
        state.alert.alertConfig.data.id,
        data
      )
      dispatch(getAlertConfig())
      return res.data
    } catch (e) {
      rejectWithValue(e.data)
    }
  }
)

const alertConfigSlice = createSlice({
  name: 'alertConfig',
  initialState: {
    data: null,
    isLoading: false,
    isUpdating: false,
    updateError: null,
    fetchError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // getAlertConfig
    builder.addCase(getAlertConfig.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAlertConfig.fulfilled, (state, { payload }) => {
      state.data = payload.length ? payload[0] : false
      state.isLoading = false
    })
    builder.addCase(getAlertConfig.rejected, (state, error) => {
      state.isLoading = false
      state.fetchError = error
    })

    // updateAlertConfig
    builder.addCase(updateAlertConfig.pending, (state) => {
      state.isUpdating = true
    })
    builder.addCase(updateAlertConfig.fulfilled, (state, { payload }) => {
      // state.data = payload
      state.isUpdating = false
    })
    builder.addCase(updateAlertConfig.rejected, (state, error) => {
      state.isUpdating = false
      state.updateError = error
    })
  }
})

// Actions
export { getAlertConfig, updateAlertConfig }

// Reducer
export default alertConfigSlice.reducer
