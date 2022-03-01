import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ThunkConfig } from '../../../../main/store';
import type { SlotFullInfoDTO } from '../../dtos';

export const getOneSlot = createAsyncThunk<SlotFullInfoDTO, string, ThunkConfig>(
  'get/one slot',
  async (id, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.get<{ data: SlotFullInfoDTO }>(`/therapists/me/slots/${id}`);

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
