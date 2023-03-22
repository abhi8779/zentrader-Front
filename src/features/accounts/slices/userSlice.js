import config from "@/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const authUser = createAsyncThunk(
  "user/auth",
  async ({ phone, code }, { rejectWithValue }) => {
    try {
      console.log("auth");
      const resp = await axios.post(
        config.BASE_URL + "/api/user/login_with_otp/",
        {
          phone,
          code,
        }
      );
      return resp.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    tokens: {},
    user: null,
    groups: null,
    isLoggedIn: false,
    isAuthenticating: false,
    isLoading: false,
    authError: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.groups = null;
      state.isLoggedIn = false;
      state.tokens = {};
    },
    updateAccessToken: (state, { payload }) => {
      state.tokens.access = payload;
    },
    postSignup: (state, { payload }) => {
      state.tokens = {
        access: payload.access,
        refresh: payload.refresh,
      };
      state.user = payload.user;
      state.groups = payload.user.groups;
      state.isAuthenticating = false;
      state.isLoggedIn = true;
    },
    updateUser: (state, { payload }) => {
      state.user = payload;
      state.groups = payload.groups;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.pending, (state) => {
      console.log("object :>> authUser.pending");
      state.isAuthenticating = true;
      state.authError = null;
    });

    builder.addCase(authUser.rejected, (state, { payload }) => {
      console.log("object :>> authUser.rejected");

      state.tokens = {};
      state.authError = payload;
      state.isAuthenticating = false;
      state.isLoggedIn = false;
    });

    builder.addCase(authUser.fulfilled, (state, { payload }) => {
      console.log("object :>> authUser.fulfilled");

      state.tokens = {
        access: payload.access,
        refresh: payload.refresh,
      };
      state.user = payload.user;
      state.groups = payload.user.groups;
      state.isAuthenticating = false;
      state.isLoggedIn = true;
    });
  },
});

const userReducer = persistReducer(
  {
    key: "user",
    storage,
    blacklist: ["authError"],
  },
  userSlice.reducer
);

// Actions
export { authUser };
export const { logout, updateAccessToken, postSignup, updateUser } =
  userSlice.actions;
// Reducer
export default userReducer;
// export default userSlice.reducer
