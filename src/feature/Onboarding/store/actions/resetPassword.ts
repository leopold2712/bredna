import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../main/store';
import { Klaviyo } from '../../../../shared/services/klaviyo';
import { ResetRequestDTO } from '../../dtos/ResetRequestDTO';
import { loginAsync } from './login';

export const resetPasswordAsync = createAsyncThunk<void, ResetRequestDTO, ThunkConfig>(
  'auth/send-reset',
  async (resetData, { rejectWithValue, dispatch }) => {
    try {
      await axios.post(
        '/therapists/auth/reset',
        { email: resetData.email, password: resetData.password },
        { headers: { 'x-reset-token': resetData.token } },
      );

      Klaviyo.resetPassword(resetData.email);

      await dispatch(loginAsync({ email: resetData.email, password: resetData.password }));
    } catch (e) {
      rejectWithValue(e.response.data.message);
    }
  },
);
