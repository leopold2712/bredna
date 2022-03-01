import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ThunkConfig } from '../../../../main/store';
import type { ListRequestParams } from '../../../../shared/dtos/list.request.params';
import type { StateEntity } from '../../../../shared/models/StateEntity';
import type { ClientSession } from '../../dtos';

type Params = {
  id: number;
  params: ListRequestParams;
};

export const getClientSessionsHistory = createAsyncThunk<
  StateEntity<ClientSession>,
  Params,
  ThunkConfig
>('get/client sessions history', async ({ id, params }, { rejectWithValue }) => {
  try {
    const {
      data: { data },
      headers,
    } = await axios.get<{ data: ClientSession[] }>(
      `/therapists/me/clients/${id}/sessions_history`,
      { params },
    );

    return { list: data, pagination: headers, isEmptySearch: false, loading: false };
  } catch (e) {
    return rejectWithValue(e.response.data.message);
  }
});
