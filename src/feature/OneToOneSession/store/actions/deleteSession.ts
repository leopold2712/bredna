import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ThunkConfig } from '../../../../main/store';

export const deleteSession = createAsyncThunk<void, number, ThunkConfig>(
  'delete/session',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/therapists/me/sessions/${id}`);

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
