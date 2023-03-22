import { logout } from '@/features/accounts/slices/userSlice'
import api from '@/services/trader'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const getAthPortfolio = createAsyncThunk(
  'athPortfolio/getPortfolio',
  async (version, { rejectWithValue }) => {
    try {
      const res = await api.Ath.Portfolio.get({
        limit: 1000
      })
      return {
        results: res.data.results,
        version
      }
    } catch (e) {
      return rejectWithValue(e.data)
    }
  }
)

const getAthPortfolioData = createAsyncThunk(
  'athPortfolio/getPortfolioData',
  async ({ filters }, { rejectWithValue, getState }) => {
    try {
      const state = getState()

      const res = await api.Ath.Results.get({
        user: state.user.user.id,
        limit: 1000,
        ...filters,
        version: filters.version !== 'all' ? filters.version : null
      })
      return {
        results: res.data.results,
        count: res.data.count
      }
    } catch (e) {
      return rejectWithValue(e.data)
    }
  }
)

const addInstrumentToAthPortfolio = createAsyncThunk(
  'athPortfolio/getInstrument',
  async ({ resultId }, { rejectWithValue }) => {
    try {
      const res = await api.Ath.Portfolio.create(resultId)
      return {
        item: res.data
      }
    } catch (e) {
      return rejectWithValue(e.data)
    }
  }
)

const deletePortfolioItem = createAsyncThunk(
  'athPortfolio/deleteItem',
  async ({ resultId }, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState()
      const items = state.ath.athPortfolio.data.portfolio.filter(
        (x) => x.result === resultId
      )
      if (items) {
        await api.Ath.Portfolio.delete(items[0].id)
        // dispatch(getAthPortfolioData())
        return {
          resultId
        }
      }
    } catch (e) {
      rejectWithValue(e.data)
    }
  }
)

const initialState = {
  data: {
    portfolio: null,
    results: null,
    instruments: [],
    counts: null
  },
  isLoading: false
}

const athPortfolioSlice = createSlice({
  name: 'ath',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAthPortfolio.pending, (state) => {
      state.isLoading = true
      state.fetchError = null
    })
    builder.addCase(
      getAthPortfolio.fulfilled,
      (state, { payload: { results } }) => {
        state.data.portfolio = results
        state.data.instruments = results.map((x) => x.result)
        state.isLoading = false
      }
    )
    builder.addCase(getAthPortfolio.rejected, (state, error) => {
      state.isLoading = false
      state.fetchError = error
    })

    builder.addCase(addInstrumentToAthPortfolio.pending, (state) => {
      state.fetchError = null
    })
    builder.addCase(
      addInstrumentToAthPortfolio.fulfilled,
      (state, { payload: { item } }) => {
        state.data.portfolio.push(item)
        state.data.instruments.push(item.result)
      }
    )
    builder.addCase(addInstrumentToAthPortfolio.rejected, (state, error) => {
      state.fetchError = error
    })

    builder.addCase(
      deletePortfolioItem.fulfilled,
      (state, { payload: { resultId } }) => {
        // Remove from portfolio list
        state.data.portfolio = state.data.portfolio.filter(
          (x) => x.result !== resultId
        )

        // Remove intrument ID
        state.data.instruments = state.data.instruments.filter(
          (x) => x !== resultId
        )

        // Remove from results data
        if (state.data.results) {
          state.data.results = state.data.results.filter(
            (x) => x.id !== resultId
          )
        }
      }
    )
    builder.addCase(deletePortfolioItem.rejected, (state, error) => {
      state.fetchError = error
    })

    builder.addCase(
      getAthPortfolioData.fulfilled,
      (state, { payload: { results, count } }) => {
        state.data.results = results
        state.data.counts = count
      }
    )
    builder.addCase(getAthPortfolioData.rejected, (state, error) => {
      state.fetchError = error
    })

    builder.addCase(logout, (state) => {
      state = initialState
    })
  }
})

// Actions
export {
  getAthPortfolio,
  addInstrumentToAthPortfolio,
  deletePortfolioItem,
  getAthPortfolioData
}
// export const { clearSelectedInstrument } = athSlice.action

// Reducer
export default athPortfolioSlice.reducer
