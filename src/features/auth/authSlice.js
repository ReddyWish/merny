import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios.js";
import axiosPrivate from "../../api/axios.js";
const LOGIN_URL = '/auth';
const REGISTER_URL = '/register';

const initialState = {
  accessToken: null,
  status: "idle",
  error: null
}

export const register = createAsyncThunk("auth/register", async () => {
  const response = await axios.post(REGISTER_URL,
    JSON.stringify({ username, password }),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    })
  return response.data
})

export const login = createAsyncThunk("auth/login", async ({ username, password }) => {
  const response = await axiosPrivate.post(LOGIN_URL,
    JSON.stringify({ username, password }),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    })
  window.localStorage.setItem('token', response.data.accessToken)
  return response.data
})

export const requestNewAccessToken = createAsyncThunk("auth/requestNewAccessToken", async () => {
  const response = await axiosPrivate.get("/refresh", {
    withCredentials: true
  });
  return response.data
})

//clearRefreshToken and clearAccessToken are needed for logout procedure, look into useLogout hook
export const clearRefreshToken = createAsyncThunk("auth/clearRefreshToken", async () => {
  const response = await axiosPrivate.post("/logout", null, {
    withCredentials: true
  })
  return response.data
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAccessToken: (state) => {
      state.accessToken = null
      state.status = "idle"
      state.error = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading"
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded"
        // state.accessToken = action.payload.accessToken
        // window.localStorage.setItem("token", action.payload.accessToken)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(register.pending, (state) => {
        state.status = "loading"
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded"
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(clearRefreshToken.fulfilled, (state) => {
        state.status = "succeeded"
      })
      .addCase(clearRefreshToken.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(requestNewAccessToken.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.accessToken = action.payload.accessToken
        window.localStorage.setItem("token", action.payload.accessToken)
      })
  }
})


export const { clearAccessToken } = authSlice.actions
export const selectAccessToken = (state) => state.auth.accessToken;
export const getStatus = (state) => state.auth.status;
export const getError = (state) => state.auth.error;
export default authSlice.reducer