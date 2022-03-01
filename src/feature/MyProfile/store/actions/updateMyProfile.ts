import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import HeyToast from '../../../../shared/components/HeyToast';
import { Klaviyo } from '../../../../shared/services/klaviyo';
import { setError } from '../../../../shared/store/error';
import { MyProfileActions } from '../actions';
import { MyProfileDTO } from '../../../../shared/dtos/myProfile.dto';
import type { UpdateMyProfileDTO } from '../../dto/UpdateMyProfileDTO';
import type { ThunkConfig } from '../../../../main/store';

export const updateMyProfileAsync = createAsyncThunk<
  MyProfileDTO,
  Partial<UpdateMyProfileDTO>,
  ThunkConfig
>(MyProfileActions.update, async (dto, { rejectWithValue, dispatch }) => {
  try {
    const {
      data: { data },
    } = await axios.patch<{ data: MyProfileDTO }>('/therapists/me', dto);

    Klaviyo.updateMe(dto);

    HeyToast.show({ text: 'Saved successfully!' });
    return data;
  } catch (e) {
    console.error(e);
    HeyToast.show({ text: 'An error occured while updating profile', isError: true });
    dispatch(
      setError({
        typePrefix: updateMyProfileAsync.typePrefix,
        error: { msg: e.message, code: e.code },
      }),
    );
    return rejectWithValue(e);
  }
});
