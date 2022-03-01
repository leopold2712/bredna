import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosV2 } from '../../../../main/network';
import { setLoading } from '../../../../shared/store/loading';
import { setError } from '../../../../shared/store/error';
import { ThunkConfig } from '../../../../main/store';
import { MyProfileActions, updateMyProfileAsync } from '../../../MyProfile/store';
import { MyProfileDTO } from '../../../../shared/dtos/myProfile.dto';

export const addProfilePhoto = createAsyncThunk<MyProfileDTO, string, ThunkConfig>(
  MyProfileActions.update,
  async (thumbnail, { rejectWithValue, dispatch }) => {
    dispatch(setLoading({ typePrefix: updateMyProfileAsync.typePrefix, is: true }));
    try {
      // const { data } = await axiosV2.post<{ data: MeResponseDTO }>('/experts/me', { thumbnail });

      // return data.data;
      return {} as MyProfileDTO;
    } catch (e) {
      console.error(e);
      dispatch(
        setError({
          typePrefix: updateMyProfileAsync.typePrefix,
          error: { msg: e.message, code: e.code },
        }),
      );
      return rejectWithValue(e);
    } finally {
      dispatch(setLoading({ typePrefix: updateMyProfileAsync.typePrefix, is: false }));
    }
  },
);
