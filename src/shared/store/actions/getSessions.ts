import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { generateRequestParams } from '../../utils';

import type { ThunkConfig } from '../../../main/store';
import type { SessionDTO } from '../../dtos/session.dto';
import type { StateEntity } from '../../models/StateEntity';

type GetSessionsRequestDTO = {
  startTime: number;
  endTime: number;
  page: number;
  pageSize?: number;
  offset?: number;
  sortBy?: string;
  sortDirection?: string;
};

export const getSessions = createAsyncThunk<
  StateEntity<SessionDTO>,
  GetSessionsRequestDTO,
  ThunkConfig
>('get/sessions', async (requestDto, { rejectWithValue, getState }) => {
  try {
    const prevData = getState().customers.sessions;

    const params = generateRequestParams(requestDto);

    const {
      data: { data },
      headers,
    } = await axios.get<{ data: SessionDTO[] }>(`/therapists/me/sessions?${params}`);

    return {
      list: data,
      pagination: headers,
      isEmptySearch: data.length
        ? false
        : (prevData.list.length && !data.length) || prevData.isEmptySearch,
    };
  } catch (err) {
    return rejectWithValue(err);
  }
});
