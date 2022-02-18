import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ticketService } from "./ticketService";
const initialState = {
  tickets: [],
  ticket: {},
  loading: true,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createTicket = createAsyncThunk(
  "ticket/create",
  async (ticketData, thunk) => {
    // console.log(ticketData);
    const token = thunk.getState().auth.user.token;

    const data = await ticketService.createTicket(ticketData, token);

    if (data.status === ("fail" || "error"))
      return thunk.rejectWithValue(data.message);

    return data;
  }
);

export const getTickets = createAsyncThunk("ticket/get", async (_, thunk) => {
  const token = thunk.getState().auth.user.token;
  const data = await ticketService.getTickets(token);

  if (data.status === ("fail" || "error")) {
    return thunk.rejectWithValue(data.message);
  }

  return data;
});

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => {
      state = {
        tickets: [],
        ticket: {},
        loading: true,
        isError: false,
        isSuccess: false,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.ticket = action.payload;
        state.isSuccess = true;
        state.isError = false;
        state.loading = false;
        state.message = "";
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.ticket = {};
        state.tickets = [];
      })
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
        state.isError = false;
        state.loading = false;
        state.isSuccess = false;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset, success } = ticketSlice.actions;

export default ticketSlice.reducer;
