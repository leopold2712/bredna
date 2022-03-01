import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from '../../../../shared/components/Header/store';
import type { ThunkConfig } from '../../../../main/store';
import { uploadMediaV2 } from '../../../../shared/utils';

export const getFileLink = createAsyncThunk<
  string,
  { file: File; param: 'image' | 'video' },
  ThunkConfig
>('therapist/getFileLink', async ({ file, param }, { dispatch, rejectWithValue }) => {
  try {
    const response = await uploadMediaV2(
      file,
      param,
      file.name.replace(/\.[^/.]+$/, ''),
      '/utils/presigned_urls',
      'therapists',
    );
    return response.key;
  } catch (error) {
    if (error.response) {
      dispatch(setError(error.response.data.message));
    } else if (error.request) {
      dispatch(setError(error.response));
    } else {
      dispatch(setError(error.response));
    }
    return rejectWithValue(error);
  }
});
