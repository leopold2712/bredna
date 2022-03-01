import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import HeyToast from '../../../../shared/components/HeyToast';
import { generateRequestParams } from '../../../../shared/utils';

import type { ThunkConfig } from '../../../../main/store';
import type { GetRevShareRequestDTO } from '../../dto/getRevShare.request.dto';
import type { GetRevShareDTO } from '../../dto/getRevShare.dto';

export const getRevShareAsync = createAsyncThunk<
  GetRevShareDTO,
  GetRevShareRequestDTO,
  ThunkConfig
>('earning/get-all', async ({ startTime, endTime }, { rejectWithValue }) => {
  try {
    const params = generateRequestParams({ startTime, endTime });

    const {
      data: { data },
    } = await axios.get<{ data: GetRevShareDTO }>(`/therapists/me/revenue/summary?${params}`);

    return data;
  } catch (e) {
    HeyToast.show({
      text: `An error occurred while adding new note: ${e.response.data.message}`,
      isError: true,
    });
    return rejectWithValue(e);
  }
});
