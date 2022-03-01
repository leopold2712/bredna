import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import HeyToast from '../../../../shared/components/HeyToast';
import { generateRequestParams } from '../../../../shared/utils';

import type { ThunkConfig } from '../../../../main/store';
import type { GetRevShareMessagingDTO } from '../../dto/getRevShareMessaging.dto';
import type { GetRevShareMessagingRequestDTO } from '../../dto/getRevShareMessaging.request.dto';

export const getRevShareMessagingAsync = createAsyncThunk<
  GetRevShareMessagingDTO,
  GetRevShareMessagingRequestDTO,
  ThunkConfig
>('earning/get-messaging', async ({ startTime, endTime }, { rejectWithValue }) => {
  try {
    const params = generateRequestParams({ startTime, endTime });

    const {
      data: { data },
    } = await axios.get<{ data: GetRevShareMessagingDTO }>(
      `/therapists/me/revenue/messaging?${params}`,
    );

    return data;
  } catch (e) {
    HeyToast.show({
      text: `An error occurred while adding new note: ${e.response.data.message}`,
      isError: true,
    });
    return rejectWithValue(e);
  }
});
