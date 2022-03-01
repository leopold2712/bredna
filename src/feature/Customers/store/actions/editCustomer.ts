import { createAsyncThunk } from '@reduxjs/toolkit';
import { isLoading } from '../../../../shared/components/Header/store';
import HeyToast from '../../../../shared/components/HeyToast';
import { axiosV2 } from '../../../../main/network';
import type { ThunkConfig } from '../../../../main/store';
import type { CustomerResponseDTO } from '../../dtos/CustomerResponseDTO';
import type { OrderDTO } from '../../dtos/OrderDTO';
import type { TimelineDTO } from '../../dtos/TimelineDTO';

type IData = {
  notes: string;
  nickname?: string;
  clientId: string;
};

export const editCustomer = createAsyncThunk<CustomerResponseDTO, IData, ThunkConfig>(
  'customer/edit',
  async ({ notes, nickname, clientId }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(isLoading(true));

      // const {
      //   data: { data: mainData },
      // } = await axiosV2.post<{ data: CustomerResponseDTO }>(`/clients/${clientId}`, {
      //   notes,
      //   nickname,
      // });

      // const {
      //   data: { data: orders },
      // } = await axiosV2.get<{ data: OrderDTO[] }>(`/clients/${clientId}/orders`);

      // const {
      //   data: { data: timeline },
      // } = await axiosV2.get<{ data: TimelineDTO[] }>(`/clients/${clientId}/timeline`);

      dispatch(isLoading(false));

      HeyToast.show({ text: 'Saved successfully!' });

      // return {
      //   ...mainData,
      //   orders,
      //   timeline,
      // };
      return {} as CustomerResponseDTO;
    } catch (e) {
      console.error(e);

      HeyToast.show({ text: 'An error occurred while editing notes or nickname', isError: true });

      dispatch(isLoading(false));
      return rejectWithValue(e);
    }
  },
);
