import { createAsyncThunk } from '@reduxjs/toolkit';
import { isLoading } from '../../../../shared/components/Header/store';
import { axiosV2 } from '../../../../main/network';
import { Klaviyo } from '../../../../shared/services/klaviyo';
import type { ThunkConfig } from '../../../../main/store';
import type { AnalyticsItemDTO } from '../../dtos';

export const getCustomersAsync = createAsyncThunk<
  AnalyticsItemDTO[],
  { start_date: number; end_date: number },
  ThunkConfig
>('analytics/customers', async ({ start_date, end_date }, { rejectWithValue, dispatch }) => {
  try {
    dispatch(isLoading(true));

    // const {
    //   data: { data },
    // } = await axiosV2.get<{ data: AnalyticsItemDTO[] }>(
    //   `/experts/me/analytics/clients?start_time=${start_date}&end_time=${end_date}`,
    // );

    // if (data.length) {
    //   Klaviyo.updateUserProperty({ had_customer: true });
    // }

    dispatch(isLoading(false));

    // return data;
    return {} as AnalyticsItemDTO[];
  } catch (e) {
    dispatch(isLoading(false));
    console.error(e);
    return rejectWithValue(e);
  }
});
