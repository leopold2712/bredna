import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ThunkConfig } from '../../../../main/store';
import HeyToast from '../../../../shared/components/HeyToast';
import type { SlotFullInfoDTO, SendMessageRequestDTO } from '../../dtos';

export const sendMessage = createAsyncThunk<unknown, SendMessageRequestDTO, ThunkConfig>(
  'post/new message',
  async (dto, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.post<{ data: SlotFullInfoDTO }>(`/therapists/me/clients/messages`, dto);

      HeyToast.show({ text: 'Sended successfully' });

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
