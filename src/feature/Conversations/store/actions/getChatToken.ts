import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ThunkConfig } from '../../../../main/store';

export const getChatToken = createAsyncThunk<string, void, ThunkConfig>(
  'chats/get-token',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.post<{ data: { token: string } }>('/therapists/me/chats/access_tokens');

      return data.token;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
