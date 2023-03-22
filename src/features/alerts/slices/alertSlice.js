import { logout } from '@/features/accounts/slices/userSlice'
import api from '@/services/trader'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const getAlerts = createAsyncThunk(
  'alerts/get',
  async (filters = {}, { rejectWithValue, getState }) => {
    try {
      const state = getState()

      const res = await api.Alerts.Alerts.get({
        ...state.alert.filters,
        ...filters
      })

      return {
        results: res.data.results,
        count: res.data.count
      }
    } catch (e) {
      return rejectWithValue(e.response)
    }
  }
)

const deleteAlert = createAsyncThunk(
  'alerts/delete',
  async ({ payload, params }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.Alerts.Alerts.delete(payload)
      dispatch(updateFilters(params))
      return res.data
    } catch (e) {
      return rejectWithValue(e.data)
    }
  }
)

const bulkDeleteAlerts = createAsyncThunk(
  'alerts/deleteBulk',
  async ({ params, payload }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.Alerts.Alerts.bulk_delete(params)
      dispatch(updateFilters(payload))
      return res.data
    } catch (e) {
      return rejectWithValue(e.data)
    }
  }
)

const createAlert = createAsyncThunk(
  'alerts/create',
  async (payload, { rejectWithValue, dispatch, getState }) => {
    const state = getState()
    try {
      const res = await api.Alerts.Alerts.create(payload)
      dispatch(updateFilters(state.alert.filters))
      return res.data
    } catch (e) {
      return rejectWithValue(e.response)
    }
  }
)

const updateAlert = createAsyncThunk(
  'alerts/update',
  async ({ id, payload }, { rejectWithValue, dispatch, getState }) => {
    const state = getState()
    try {
      const res = await api.Alerts.Alerts.update(id, payload)
      dispatch(updateFilters(state.alert.alerts))
      return res.data
    } catch (e) {
      return rejectWithValue(e.data)
    }
  }
)

const updateFilters = createAsyncThunk(
  'alerts/filters',
  async (filters, { rejectWithValue, dispatch }) => {
    try {
      dispatch(getAlerts(filters))
      return filters
    } catch (e) {
      return rejectWithValue(e.data)
    }
  }
)

const alertSlice = createSlice({
  name: 'alerts',
  initialState: {
    subscription: null,
    data: null,
    counts: null,
    isLoadingConfig: false,
    isLoading: false,
    isFetchingSubscription: true,
    createUpdateError: null,
    filters: {}
  },
  reducers: {
    clearErrors: (state) => {
      state.createUpdateError = null
      state.fetchError = null
    }
  },
  extraReducers: (builder) => {
    // getAlerts
    builder.addCase(getAlerts.pending, (state) => {
      state.isLoading = true
      state.fetchError = null
    })
    builder.addCase(
      getAlerts.fulfilled,
      (state, { payload: { results, count } }) => {
        state.results = results
        state.counts = count
        state.isLoading = false
      }
    )
    builder.addCase(getAlerts.rejected, (state, error) => {
      state.isLoading = false
      state.fetchError = error
    })

    builder.addCase(createAlert.pending, (state) => {
      state.createUpdateError = null
      state.isCreatingUpdating = true
    })
    builder.addCase(createAlert.fulfilled, (state) => {
      state.createUpdateError = null
      state.isCreatingUpdating = false
    })
    builder.addCase(createAlert.rejected, (state, { payload }) => {
      state.createUpdateError = payload
      state.isCreatingUpdating = false
    })

    builder.addCase(updateAlert.pending, (state) => {
      state.createUpdateError = null
      state.isCreatingUpdating = true
    })
    builder.addCase(updateAlert.fulfilled, (state) => {
      state.createUpdateError = null
      state.isCreatingUpdating = false
    })
    builder.addCase(updateAlert.rejected, (state, { payload }) => {
      state.createUpdateError = payload
      state.isCreatingUpdating = false
    })

    builder.addCase(updateFilters.fulfilled, (state, { payload }) => {
      state.filters = payload
    })

    builder.addCase(logout, (state) => {
      state.results = null
      state.counts = null
    })
  }
})

// Actions
export {
  getAlerts,
  deleteAlert,
  createAlert,
  updateFilters,
  updateAlert,
  bulkDeleteAlerts
}
export const { clearErrors } = alertSlice.actions

// Reducer
export default alertSlice.reducer
