/* eslint-disable no-await-in-loop */
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

export const getExperts = createAsyncThunk<
  GetExpertResponse,
  { page?: number; all?: boolean },
  ThunkConfig
>('hubs/getExperts', async ({ page, all = false }, { dispatch, rejectWithValue }) => {
  try {
    dispatch(isLoading(true));

    const pageParam = `&page=${page || 1}`;
    // let expertsPagination = { 'x-total-pages': 1 };
    // let result: NewExpertDTO[] = [];
    let pagination;
    if (all) {
      // for (let i = 1; i <= +expertsPagination['x-total-pages']; i += 1) {
      // const {
      //   data: { data },
      //   headers,
      // } = await axiosV2.get<{ data: NewExpertDTO[] }>(`/members?page=${i}`);
      // expertsPagination = headers;
      // result = [...result, ...data];
      // }
    } else {
      // const {
      //   data: { data },
      //   headers,
      // } = await axiosV2.get<{ data: NewExpertDTO[] }>(`/members?${pageParam}`);
      // result = data;
      // pagination = headers;
    }

    dispatch(isLoading(false));
    // return {
    //   list: result,
    //   pagination,
    // };

    return {} as GetExpertResponse;
  } catch (e) {
    dispatch(isLoading(false));
    console.error(e);
    return rejectWithValue(e);
  }
});
