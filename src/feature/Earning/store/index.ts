import { createSlice } from '@reduxjs/toolkit';
import { getRevShareAsync } from './actions/getRevShareAsync';
import { getRevShareMessagingAsync } from './actions/getRevShareMessagingAsync';

import type { TTotal } from '../types';
import type { GetRevShareMessagingDTO } from '../dto/getRevShareMessaging.dto';

interface IInitialState {
  month?: TTotal[];
  total?: TTotal;
  messaging?: GetRevShareMessagingDTO;
  isLoaded: boolean;
  isMessageLoaded: boolean;
}

const initialState: IInitialState = {
  month: [],
  total: undefined,
  messaging: undefined,
  isLoaded: true,
  isMessageLoaded: true,
};

const earningSlice = createSlice({
  name: 'earning',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRevShareAsync.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(getRevShareAsync.fulfilled, (state, { payload }) => {
      state.isLoaded = true;
      state.total = payload.total;

      const month = Object.keys(payload).filter((objKey: string) => objKey !== 'total');
      state.month = month.map((key) => payload[key]);
    });
    builder.addCase(getRevShareMessagingAsync.pending, (state) => {
      state.isMessageLoaded = false;
    });
    builder.addCase(getRevShareMessagingAsync.fulfilled, (state, { payload }) => {
      state.isMessageLoaded = true;
      state.messaging = payload;
    });
  },
});

export default earningSlice.reducer;
