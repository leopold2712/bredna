import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import axios from 'axios';
import { Klaviyo } from '../../../../shared/services/klaviyo';
import type { ThunkConfig } from '../../../../main/store';
import HeyToast from '../../../../shared/components/HeyToast';
import { MyProfileActions } from '../actions';
import { MyProfileDTO } from '../../../../shared/dtos/myProfile.dto';

export const getMyProfile = createAsyncThunk<MyProfileDTO, void, ThunkConfig>(
  MyProfileActions.get,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<{ data: MyProfileDTO }>('/therapists/me');

      return data.data;
    } catch (e) {
      console.error(e);
      HeyToast.show({ text: 'An error occurred while loading profile', isError: true });
      return rejectWithValue(e);
    }
  },
);
