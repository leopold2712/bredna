import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '../../../../main/store';
import { axiosV2 } from '../../../../main/network';
import { setError } from '../../../../shared/store/error';
import { updateMyProfileAsync } from '..';
import { MyProfileDTO } from '../../../../shared/dtos/myProfile.dto';

export const updateProfilePictureAsync = createAsyncThunk<
  MyProfileDTO,
  { thumbnail?: string },
  ThunkConfig
>('profile/updateProfilePicture', async ({ thumbnail }, { rejectWithValue, dispatch }) => {
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
  }
});
