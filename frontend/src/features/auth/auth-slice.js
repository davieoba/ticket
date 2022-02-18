import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import { authService } from "./auth-service";
// @ this code is very important it is what makes the user logged in and even when I refresh the user still is logged in because the user is saved in the localStorage

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunk) => {
    const data = await authService.register(user);
    if (data.status === ("fail" || "error")) {
      const message = "something went very wrong";
      return thunk.rejectWithValue(message);
    }
    localStorage.setItem("user", JSON.stringify(data));

    // console.log(data);
    return data;
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunk) => {
  const data = await authService.login(user);
  // console.log(data);
  if (data.status === ("fail" || "error")) {
    const message = "something went very wrong";
    return thunk.rejectWithValue(data.message || message);
  }
  localStorage.setItem("user", JSON.stringify(data));
  return data;
});

export const logout = createAsyncThunk("auth/logout", async (user, thunk) => {
  authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    getRegisteredUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        // console.log("line 62", action);
        state.loading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isError = true;
        // return thunk.rejectWithValue(message); note: this is my action.payload below
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.loading = false;
      });
  },
});

export const { reset, getRegisteredUser } = authSlice.actions;

export default authSlice.reducer;
