import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import { ThunkConfig } from '../../../../main/store';
import { MyProfileDTO } from '../../../../shared/dtos/myProfile.dto';
import { Klaviyo } from '../../../../shared/services/klaviyo';

export const meAsync = createAsyncThunk<MyProfileDTO, void, ThunkConfig>(
  'auth/meAsync',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.get<{ data: MyProfileDTO }>('/therapists/me');

      if (data.email) {
        Klaviyo.updateUserProperty({ last_active: moment() }, data.email);
      }

      return data;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  },
);
