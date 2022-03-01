import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../../../main/store';
import { isLoading } from '../../../../../../shared/components/Header/store';
import { MyProfileDTO } from '../../../../../../shared/dtos/myProfile.dto';
import { setError } from '../../../../../../shared/store/error';
import { UpdateTherapistDTO } from '../../dtos/updateTherapist.dto';

export const updateTherapistInfo = createAsyncThunk<
  MyProfileDTO,
  Partial<UpdateTherapistDTO>,
  ThunkConfig
>(
  'completeProfessionalID/updateTherapistInfo',
  async (
    { country_id, state_id, primary_language_id, skills, education, certificates },
    { dispatch, rejectWithValue },
  ) => {
    dispatch(isLoading(true));
    try {
      const { data } = await axios.patch<{ data: MyProfileDTO }>('/therapists/me', {
        country_id,
        state_id,
        primary_language_id,
        skills,
        education,
        certificates,
      });

      dispatch(isLoading(false));
      return data.data;
    } catch (error) {
      if (error.response) {
        dispatch(setError(error.response.data.message));
      } else if (error.request) {
        dispatch(setError(error.request));
      } else {
        dispatch(setError(error.message));
      }
      dispatch(isLoading(false));
      return rejectWithValue(error);
    } finally {
      dispatch(isLoading(false));
    }
  },
);
