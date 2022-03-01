import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GALoginTriggers, loginAnalyticsLog } from '../../services/login.analytics';
import type { ThunkConfig } from '../../../../main/store';
import type { MyProfileDTO } from '../../../../shared/dtos/myProfile.dto';
import type { LoginRequestDTO } from '../../dtos';

export const loginAsync = createAsyncThunk<MyProfileDTO, LoginRequestDTO, ThunkConfig>(
  'auth/loginAsync',
  async (dto, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.post<{ data: MyProfileDTO }>('/therapists/auth/login', dto);

      loginAnalyticsLog(GALoginTriggers.LOGIN_SUCCESS)();
      return data;
    } catch (e) {
      loginAnalyticsLog(GALoginTriggers.LOGIN_ERROR)();
      return rejectWithValue(e.response.data.message);
    }
  },
);
