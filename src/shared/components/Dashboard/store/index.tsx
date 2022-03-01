import { createSlice } from '@reduxjs/toolkit';
import {
  DashboardClient,
  DashboardMessage,
  DashboardSchedule,
  DashboardAvailability,
} from '../models';
// import { getSummaryAsync } from './actions/getSummaryAsync';

type DashboardState = {
  clients: DashboardClient[];
  messages: DashboardMessage[];
  schedule: DashboardSchedule;
};

const initialState: DashboardState = {
  clients: [],
  messages: [],
  schedule: {
    month: '',
    year: '',
    week: [],
    grid: [],
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addCase(getSummaryAsync.fulfilled, (state, action) => {
  //     state.summary = action.payload;
  //   });
  //   builder.addCase(getSummaryAsync.rejected, (state) => {
  //     state.summary = initialState.summary;
  //   });
  // },
});

export default dashboardSlice.reducer;
