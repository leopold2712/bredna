import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../../main/store/index';

export const setNotificationsRead = createAsyncThunk<null, void, ThunkConfig>(
  'notifications/read',
  async (_, { rejectWithValue }) => {
    try {
      await axios.patch(`/therapists/me/notifications`, {
        is_read: true,
      });

      return null;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  },
);
