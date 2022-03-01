import { createSlice } from '@reduxjs/toolkit';

import { CustomersState } from '../models';
import { initialPagination } from '../../../shared/constants/pagination';
import {
  getProducts,
  getTags,
  getCustomersAsync,
  getClientAsync,
  getClientJourneysAsync,
  getClientSessionsHistory,
} from './actions';
import { getSessions } from '../../../shared/store/actions/getSessions';
import { initialStateEntity } from '../../../shared/constants';

import type { ClientDTO } from '../../../shared/dtos';

const initialClient = {
  client: {} as ClientDTO,
  journeys: {
    ...initialStateEntity,
    loading: false,
  },
  sessionsHistory: {
    ...initialStateEntity,
    loading: false,
  },
  loading: true,
  isEmptySearch: false,
};

const initialState: CustomersState = {
  customers: {
    list: [],
    pagination: initialPagination,
    isEmptySearch: false,
  },
  sessions: {
    list: [],
    pagination: initialPagination,
    isEmptySearch: false,
    loading: false,
  },
  loadingCustomers: true,
  currentCustomer: initialClient,
  loadingCurrentCustomer: true,
  tags: [],
  availableProducts: [],
};

const clientSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    clearCurrentCustomer: (state) => {
      state.currentCustomer = initialClient;
    },
    setLoadingCustomer: (state, action) => {
      state.loadingCurrentCustomer = action.payload;
    },
    setLoadingCustomers: (state, action) => {
      state.loadingCustomers = action.payload;
    },
    clearCustomers: (state) => {
      state.customers = {
        list: [],
        pagination: initialPagination,
        isEmptySearch: false,
      };
    },
    setJourneys: (state, action) => {
      state.currentCustomer = {
        ...state.currentCustomer,
        journeys: { ...state.currentCustomer.journeys, list: action.payload },
      };
    },
  },
  extraReducers: (builder) => {
    /* clients table data */
    builder.addCase(getCustomersAsync.fulfilled, (state, action) => {
      state.customers = action.payload;
    });
    builder.addCase(getCustomersAsync.rejected, (state) => {
      state.customers.list = [];
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload.filter((tag) => tag.name.trim().length);
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.availableProducts = action.payload;
    });

    /* single client data */
    builder.addCase(getClientAsync.pending, (state) => {
      state.currentCustomer.loading = true;
    });
    builder.addCase(getClientAsync.fulfilled, (state, { payload }) => {
      state.currentCustomer.loading = false;
      state.currentCustomer.client = payload;
    });

    builder.addCase(getClientJourneysAsync.pending, (state) => {
      state.currentCustomer.journeys.loading = true;
    });
    builder.addCase(getClientJourneysAsync.rejected, (state) => {
      state.currentCustomer.journeys.loading = false;
    });
    builder.addCase(getClientJourneysAsync.fulfilled, (state, { payload }) => {
      state.currentCustomer.journeys = payload;
    });

    builder.addCase(getClientSessionsHistory.pending, (state) => {
      state.currentCustomer.sessionsHistory.loading = true;
    });
    builder.addCase(getClientSessionsHistory.rejected, (state) => {
      state.currentCustomer.sessionsHistory.loading = false;
    });
    builder.addCase(getClientSessionsHistory.fulfilled, (state, { payload }) => {
      state.currentCustomer.sessionsHistory = payload;
    });

    builder.addCase(getSessions.pending, (state) => {
      state.sessions.loading = true;
    });
    builder.addCase(getSessions.rejected, (state) => {
      state.sessions.loading = false;
      state.sessions.list = [];
    });
    builder.addCase(getSessions.fulfilled, (state, { payload }) => {
      state.sessions.list = payload.list;
      state.sessions.loading = false;
    });
  },
});

export const {
  clearCurrentCustomer,
  setLoadingCustomer,
  clearCustomers,
  setLoadingCustomers,
  setJourneys,
} = clientSlice.actions;

export default clientSlice.reducer;
