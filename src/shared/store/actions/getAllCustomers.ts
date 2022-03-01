/* eslint-disable no-await-in-loop */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CustomerDTO } from '../../../feature/Customers/dtos/CustomerDTO';
import { axiosV2 } from '../../../main/network';
import { ThunkConfig } from '../../../main/store';
import { isLoading } from '../../components/Header/store';
import { generateTagParam } from '../../utils';

type RequestParams = {
  tags?: string;
  query?: string;
  source?: 'chat' | 'export';
};

type ReponseHeaders = {
  'x-next-page': string;
  'x-offset': string;
  'x-page': string;
  'x-per-page': string;
  'x-prev-page': string;
  'x-total': string;
  'x-total-pages': string;
};

export const getAllCustomers = createAsyncThunk<CustomerDTO[], RequestParams, ThunkConfig>(
  'customers/allForExport',
  async ({ tags, query, source }, { dispatch, rejectWithValue }) => {
    if (source === 'export') dispatch(isLoading(true));
    try {
      let page = 1;
      // let result: CustomerDTO[] = [];

      const tagsParam = generateTagParam(tags);
      const queryParam = query ? `&q=${query}` : '';
      const pageSizeParam = 'page_size=100';

      // const {
      //   data: { data },
      //   headers,
      // } = await axiosV2.get<{ data: CustomerDTO[]; headers: ReponseHeaders }>(
      //   `/clients?${pageSizeParam}${tagsParam}${queryParam}`,
      // );

      // result = [...data];
      page += 1;

      // for (page; page <= headers['x-total-pages']; page += 1) {
      //   const pageParam = `&page=${page}`;

      // const {
      //   data: { data },
      // } = await axiosV2.get<{ data: CustomerDTO[]; headers: ReponseHeaders }>(
      //   `/clients?${pageSizeParam}${pageParam}${tagsParam}${queryParam}`,
      // );
      // result = [...result, ...data];
      // }

      // return result;

      return {} as CustomerDTO[];
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    } finally {
      dispatch(isLoading(false));
    }
  },
);
