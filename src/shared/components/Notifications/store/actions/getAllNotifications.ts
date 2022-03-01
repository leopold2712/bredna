import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../../main/store/index';
import { GETNotificationsResponse, GETNotificationsRequest } from '../../dto';

export const getAllNotifications = createAsyncThunk<
  GETNotificationsResponse,
  GETNotificationsRequest,
  ThunkConfig
>('notifications/all', async (params, { rejectWithValue }) => {
  try {
    const { data, headers } = await axios.get('/therapists/me/notifications', { params });

    return {
      list: data.data,
      pagination: headers,
    };
  } catch (err) {
    return rejectWithValue(err);
  }
});
