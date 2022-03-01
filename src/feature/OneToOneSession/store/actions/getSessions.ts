/* eslint-disable no-await-in-loop */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import HeyToast from '../../../../shared/components/HeyToast';
import { generateRequestParams } from '../../../../shared/utils';

import type { SessionDTO } from '../../dtos';
import type { ThunkConfig } from '../../../../main/store';

export const getSessions = createAsyncThunk<
  SessionDTO[],
  { startTime: number; endTime: number; pageSize?: number },
  ThunkConfig
>('get/sessions', async ({ startTime, endTime, pageSize = 100 }, { rejectWithValue }) => {
  try {
    let result: SessionDTO[] = [];
    let pagination = { totalPages: 1 };

    const params = generateRequestParams({ startTime, endTime, pageSize });

    for (let page = 1; page <= pagination.totalPages; page += 1) {
      const {
        data: { data },
        headers,
      } = await axios.get<{ data: SessionDTO[] }>(`/therapists/me/sessions?page=${page}&${params}`);

      result = [...result, ...data];
      pagination = headers;
    }

    return result;
  } catch (err) {
    HeyToast.show({ text: 'Error while getting schedule', isError: true });
    console.error(err);
    return rejectWithValue(err);
  }
});
