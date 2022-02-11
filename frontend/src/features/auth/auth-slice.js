import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  loading: false,
  isError: false,
  isSuccess: false,
  message: ''
}

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunk) => {
    console.log(user)
  }
)

export const login = createAsyncThunk('auth/login', async (user, thunk) => {
  console.log(user)
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
})

export default authSlice.reducer
