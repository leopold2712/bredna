import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialPagination } from '../../../constants/pagination';
import { getAllNotifications } from './actions';
import type { RootState } from '../../../../main/store/rootReducer';
import type { GETNotificationsResponse } from '../dto';

export type NotificationState = {
  loading: boolean;
  error: string | null;
  notifications: GETNotificationsResponse;
};

const initialState: NotificationState = {
  loading: true,
  error: null,
  notifications: {
    list: [],
    pagination: initialPagination,
  },
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotificationStatusLocally: (state, action: PayloadAction<number>) => {
      state.notifications = {
        ...state.notifications,
        list: state.notifications.list.map((n) => {
          if (n.id === action.payload) {
            return { ...n, is_read: !n.is_read };
          }
          return n;
        }),
      };
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllNotifications.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message) state.error = action.error.message;
    });
    builder.addCase(getAllNotifications.fulfilled, (state, action) => {
      const { list, pagination } = action.payload;
      state.notifications = {
        list,
        pagination,
      };
      state.loading = false;
    });
  },
});

export const getIsLoading = (state: RootState): boolean => state.notifications.loading;
export const getError = (state: RootState): string | null => state.header.error;
export const getNotifications = (state: RootState): GETNotificationsResponse =>
  state.notifications.notifications;

export const { changeNotificationStatusLocally, setError, clearError } = notificationSlice.actions;
export default notificationSlice.reducer;
