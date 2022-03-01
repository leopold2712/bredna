import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosV2 } from '../../../main/network';
import { isLoading } from '../../components/Header/store';
import type { ThunkConfig } from '../../../main/store';
import type { ResponseHeaders } from '../../dtos/network.dto';
import { NewExpertDTO } from '../../dtos';

type GetExpertResponse = {
  list: NewExpertDTO[];
  pagination: ResponseHeaders;
};

export const getAllExperts = createAsyncThunk<GetExpertResponse, void, ThunkConfig>(
  'hubs/getExperts',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(isLoading(true));

      // const {
      //   data: { data },
      //   headers,
      // } = await axiosV2.get<{ data: NewExpertDTO[] }>(`/members`);

      dispatch(isLoading(false));

      // return {
      //   list: data,
      //   pagination: headers,
      // };

      return {} as GetExpertResponse;
    } catch (e) {
      dispatch(isLoading(false));
      console.error(e);
      return rejectWithValue(e);
    }
  },
);
