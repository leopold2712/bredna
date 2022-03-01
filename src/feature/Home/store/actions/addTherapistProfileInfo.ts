import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../main/store';
import { isLoading } from '../../../../shared/components/Header/store';
import { MyProfileDTO } from '../../../../shared/dtos/myProfile.dto';
import { setError } from '../../../../shared/store/error';

type UpdateRequest = {
  professional_title_id: number | null;
  professional_title_text: string | null;
  about: string;
  state_id: number | null;
  original_image?: string;
  country_id: number | null;
  primary_language: number | null;
};

export const addTherapistProfileInfo = createAsyncThunk<MyProfileDTO, UpdateRequest, ThunkConfig>(
  'exportProfile/addExpertProfileInfo',
  async (dto, { dispatch, rejectWithValue }) => {
    dispatch(isLoading(true));
    try {
      const { data } = await axios.patch<{ data: MyProfileDTO }>(`/therapists/me`, dto);

      // Klaviyo.createExpertProfile({ id: professional_title_id, about });

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
