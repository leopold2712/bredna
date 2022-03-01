import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAnalyticsTableAsync, getOrdersAsync, getCustomersAsync } from './actions';
import type { AnalyticsItemDTO } from '../dtos/analyticsItem.dto';
import type { orderSliceState } from '../models/orderSliceState';

const initialState: orderSliceState = {
  orders: [],
  customers: [],
  table: undefined,
  analyticsLoading: true,
  initialAnalyticsLoaded: false,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.analyticsLoading = true;
    },
    clearAnalyticsOrders: (state) => {
      state.orders = [];
      state.customers = [];
      state.analyticsLoading = true;
      state.initialAnalyticsLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersAsync.pending, (state) => {
      state.analyticsLoading = true;
    });
    // builder.addCase(getOrdersAsync.fulfilled, (state, action) => {
    //   state.analyticsLoading = false;
    //   state.orders = action.payload;
    // });
    // builder.addCase(getCustomersAsync.fulfilled, (state, action) => {
    //   state.customers = action.payload;
    // });
    // builder.addCase(getAnalyticsTableAsync.fulfilled, (state, action) => {
    //   state.table = action.payload;
    //   if (!state.initialAnalyticsLoaded) {
    //     state.initialAnalyticsLoaded = true;
    //   }
    // });
  },
});

export const { clearAnalyticsOrders, setLoading } = analyticsSlice.actions;

export default analyticsSlice.reducer;
