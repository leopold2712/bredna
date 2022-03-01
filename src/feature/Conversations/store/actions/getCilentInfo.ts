import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../main/store';
import { ClientDTO } from '../../../../shared/dtos/client.dto';

export const getClientInfo = createAsyncThunk<ClientDTO, number, ThunkConfig>(
  'chat/client',
  async (id, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.get<{ data: ClientDTO }>(`/therapists/me/clients/${id}`);

      return data;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  },
);
