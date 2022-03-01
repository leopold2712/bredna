import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import HeyToast from '../../../../shared/components/HeyToast';

import type { ThunkConfig } from '../../../../main/store';
import type { ClientDTO } from '../../../../shared/dtos/client.dto';

type Res = ClientDTO;
type Req = {
  id: number;
};

export const getClientAsync = createAsyncThunk<Res, Req, ThunkConfig>(
  'client/client',
  async ({ id }, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.get<{ data: ClientDTO }>(`/therapists/me/clients/${id}`);

      return data;
    } catch (e) {
      HeyToast.show({ text: e.message, isError: true });

      return rejectWithValue(e);
    }
  },
);
