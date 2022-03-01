import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../main/store';
import HeyToast from '../../../../shared/components/HeyToast';

type IData = {
  clientId: string;
  tag: string;
};

export const removeTag = createAsyncThunk<null, IData, ThunkConfig>(
  'customer/removeTag',
  async ({ tag, clientId }, { rejectWithValue }) => {
    try {
      await axios.delete(`/therapists/me/clients/${clientId}/tags`, { data: { tag } });

      return null;
    } catch (e) {
      console.error(e);
      HeyToast.show({ text: 'An error occurred while removing tag', isError: true });

      return rejectWithValue(e);
    }
  },
);
