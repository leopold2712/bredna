/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../main/store';

export const sendRecoverPassword = createAsyncThunk<void, string, ThunkConfig>(
  'auth/recover',
  async (email, { rejectWithValue }) => {
    try {
      await axios.post('/therapists/auth/send_reset', { email });
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);
