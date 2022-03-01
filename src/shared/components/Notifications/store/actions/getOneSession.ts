import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../../main/store';
import type { SessionDTO } from '../../../../dtos/session.dto';
import HeyToast from '../../../HeyToast';

export const getOneSession = createAsyncThunk<SessionDTO, string, ThunkConfig>(
  'get/one-session',
  async (id, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.get<{ data: SessionDTO }>(`/therapists/me/sessions/${id}`);
      return data;
    } catch (err) {
      HeyToast.show({ text: err.payload.response.data.message, isError: true });
      return rejectWithValue(err);
    }
  },
);
