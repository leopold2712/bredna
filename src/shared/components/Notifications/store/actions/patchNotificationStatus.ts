import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../../main/store/index';

export const patchNotificationsStatus = createAsyncThunk<
  null,
  { id: number; is_read: boolean },
  ThunkConfig
>('notification/read', async ({ id, is_read }, { rejectWithValue }) => {
  try {
    await axios.patch(`/therapists/me/notifications/${id}`, {
      is_read,
    });

    return null;
  } catch (err) {
    console.error(err);
    return rejectWithValue(err);
  }
});
