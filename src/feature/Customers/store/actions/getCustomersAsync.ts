import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import HeyToast from '../../../../shared/components/HeyToast';
import { generateRequestParams, generateRefParams } from '../../../../shared/utils';
import { setLoadingCustomers } from '..';

import type { ClientDTO } from '../../../../shared/dtos/client.dto';
import type { GetCustomersParams } from '../../dtos';
import type { StateEntity } from '../../../../shared/models/StateEntity';
import type { ThunkConfig } from '../../../../main/store';

export const getCustomersAsync = createAsyncThunk<
  StateEntity<ClientDTO>,
  GetCustomersParams,
  ThunkConfig
>(
  'clients/get-all',
  async ({ primitiveParams, referenceParams }, { dispatch, rejectWithValue, getState }) => {
    dispatch(setLoadingCustomers(true));
    try {
      const prevData = getState().customers.customers;

      const pParams = generateRequestParams(primitiveParams);
      const refParams = generateRefParams(referenceParams);

      const params = pParams + refParams;

      const {
        data: { data },
        headers,
      } = await axios.get<{ data: ClientDTO[] }>(`/therapists/me/clients?${params}`);
      return {
        list: data,
        pagination: headers,
        isEmptySearch: data.length
          ? false
          : (prevData.list.length && !data.length) || prevData.isEmptySearch,
      };
    } catch (e) {
      HeyToast.show({ text: e.payload.response.data.message, isError: true });
      return rejectWithValue(e);
    } finally {
      dispatch(setLoadingCustomers(false));
    }
  },
);
