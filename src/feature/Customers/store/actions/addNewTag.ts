import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../main/store';
import { isLoading } from '../../../../shared/components/Header/store';
import HeyToast from '../../../../shared/components/HeyToast';

type IData = {
  clientId: string;
  tag: string;
};

export const addNewTag = createAsyncThunk<null, IData, ThunkConfig>(
  'customer/addNewTag',
  async ({ tag, clientId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`therapists/me/clients/${clientId}/tags`, {
        tag,
      });

      dispatch(isLoading(false));

      HeyToast.show({ text: 'Tag added successfullly' });

      return null;
    } catch (e) {
      console.error(e);
      HeyToast.show({ text: 'An error occurred while adding new tag', isError: true });

      dispatch(isLoading(false));
      return rejectWithValue(e);
    }
  },
);
