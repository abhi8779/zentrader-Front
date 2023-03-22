import { logout } from '@/features/accounts/slices/userSlice'
import ZenApi from '@/services/trader'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const getSubscriptions = createAsyncThunk(
  'subscription/get',
  async (payload, { rejectWithValue }) => {
    try {
      const p = []
      p.push(
        ZenApi.Subscription.Subscription.get({
          expand: 'plan.plan_group,billing_plan.plan'
        })
      )
      p.push(
        await ZenApi.Subscription.UserFeatures.get({
          expand: 'feature'
        })
      )
      const [subRes, featRes] = await Promise.all(p)
      return {
        subscriptions: subRes.data.results,
        features: featRes.data.results
      }
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  }
)

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState: {
    data: null,
    isLoading: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubscriptions.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(getSubscriptions.rejected, (state, { payload }) => {
      state.subscriptions = null
      state.features = null
      state.isLoading = false
    })

    builder.addCase(
      getSubscriptions.fulfilled,
      (state, { payload: { subscriptions, features } }) => {
        state.subscriptions = subscriptions
        state.features = features
        state.isLoading = false
      }
    )

    builder.addCase(logout, (state) => {
      state.subscriptions = null
      state.features = null
    })
  }
})

// Actions
export { getSubscriptions }
export const { updateAccessToken } = subscriptionSlice.actions
// Reducer
export default subscriptionSlice.reducer
