import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../main/store';
import HeyToast from '../../../../shared/components/HeyToast';
import { StateEntity } from '../../../../shared/models/StateEntity';
import { NoticeDTO } from '../../../../shared/dtos';

type RequestParams = {
  id: number;
  page: number;
};

export const getClientNotices = createAsyncThunk<
  StateEntity<NoticeDTO>,
  RequestParams,
  ThunkConfig
>('client/get notices', async ({ id, page }, { rejectWithValue, getState }) => {
  try {
    const {
      data: { data },
      headers,
    } = await axios.get<{ data: NoticeDTO[] }>(
      `/therapists/me/clients/${id}/messages?page=${page}`,
    );

    return {
      list:
        headers['x-page'] !== '1' ? [...getState().liveSession.clientNotices.list, ...data] : data,
      pagination: headers,
      isEmptySearch: false,
    };
  } catch (err) {
    HeyToast.show({ text: err.message, isError: true });
    return rejectWithValue(err);
  }
});
