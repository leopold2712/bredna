import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../main/store';
import { MyProfileDTO } from '../../../../shared/dtos/myProfile.dto';
import { setError } from '../../../../shared/store/error';
import { SignupRequestDTO } from '../../dtos';

type Res = string;
type Req = { dto: SignupRequestDTO };

export const signup = createAsyncThunk<Res, Req, ThunkConfig>(
  'auth/create-account',
  async ({ dto }, { dispatch, rejectWithValue }) => {
    try {
      const {
        data: { data },
        headers,
      } = await axios.post<{ data: MyProfileDTO }>('/therapists/auth/signup', dto);

      // Klaviyo.signup({
      //   email: data.email,
      //   first_name: data.first_name,
      //   last_name: data.last_name,
      // });

      return headers['x-auth-token'];
    } catch (error) {
      if (error.response) {
        dispatch(setError({ typePrefix: 'signup', error: error.response.data.message }));
      } else if (error.request) {
        dispatch(setError(error.response));
      } else {
        dispatch(setError(error.response));
      }
      return rejectWithValue(error);
    }
  },
);
