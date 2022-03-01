import { createAsyncThunk } from '@reduxjs/toolkit';
import { isLoading } from '../../../../shared/components/Header/store';
import { axiosV2 } from '../../../../main/network';
import type { ThunkConfig } from '../../../../main/store';
import type { AnalyticsItemDTO } from '../../dtos';

export const getOrdersAsync = createAsyncThunk<
  AnalyticsItemDTO[],
  { start_date: number; end_date: number },
  ThunkConfig
>('analytics/orders', async ({ start_date, end_date }, { rejectWithValue, dispatch }) => {
  try {
    dispatch(isLoading(true));

    // const {
    //   data: { data },
    // } = await axiosV2.get<{ data: AnalyticsItemDTO[] }>(
    //   `/experts/me/analytics/orders?start_time=${start_date}&end_time=${end_date}`,
    // );

    dispatch(isLoading(false));

    // return data;
    return {} as AnalyticsItemDTO[];
  } catch (err) {
    dispatch(isLoading(false));
    return rejectWithValue(err);
  }
});
