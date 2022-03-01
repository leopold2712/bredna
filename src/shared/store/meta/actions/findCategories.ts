import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CategoriesDTO } from '../../../dtos';
import { axiosV2 } from '../../../../main/network';
import { ThunkConfig } from '../../../../main/store';

export const findCategories = createAsyncThunk<
  CategoriesDTO[],
  { term: string; scope: 'all' | 'root' | 'child' },
  ThunkConfig
>('meta/findCategories', async ({ term, scope }, { rejectWithValue }) => {
  try {
    // const {
    //   data: { data },
    // } = await axiosV2.get<{ data: CategoriesDTO[] }>(`/utils/categories?q=${term}&scope=${scope}`);
    // return data;

    return {} as CategoriesDTO[];
  } catch (e) {
    return rejectWithValue(e);
  }
});
