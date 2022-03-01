import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ThunkConfig } from '../../../../main/store';
import type { SimpleType } from '../../../../shared/dtos/simple.dto';

type GetTagsResponse = SimpleType[];

export const getTags = createAsyncThunk<GetTagsResponse, void, ThunkConfig>(
  'customer/getTags',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.get<{ data: GetTagsResponse }>(`therapists/me/tags`);

      return data;
    } catch (e) {
      console.error(e);

      return rejectWithValue(e);
    }
  },
);
