import { createAsyncThunk } from '@reduxjs/toolkit';
import { isLoading } from '../../../../shared/components/Header/store';
import type { ThunkConfig } from '../../../../main/store';
import type { AnalyticsTableDTO } from '../../dtos/analyticsTable.dto';
import { axiosV2 } from '../../../../main/network';

export const getAnalyticsTableAsync = createAsyncThunk<
  AnalyticsTableDTO,
  { start_date: number; end_date: number },
  ThunkConfig
>('analytics/table', async ({ start_date, end_date }, { rejectWithValue, dispatch }) => {
  try {
    dispatch(isLoading(true));

    // const {
    //   data: { data },
    // } = await axiosV2.get<{ data: AnalyticsTableDTO }>(
    //   `/experts/me/revenue/income?start_date=${start_date}&end_date=${end_date}`,
    // );

    dispatch(isLoading(false));

    // return data;
    return {} as AnalyticsTableDTO;
  } catch (e) {
    dispatch(isLoading(false));
    console.error(e);
    return rejectWithValue(e);
  }
});
