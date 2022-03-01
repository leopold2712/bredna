/* eslint-disable no-await-in-loop */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { generateRefParams, generateRequestParams } from '../../../../shared/utils/index';
import { setLoadingCustomers } from '..';
import type { ClientDTO } from '../../../../shared/dtos/client.dto';
import type { ThunkConfig } from '../../../../main/store';
import type { GetCustomersParams } from '../../dtos';
import { ClientsTableRow } from '../../models/ClientsTableRow';
import { clientsToRows } from '../../utils/clientsToRows';

export const getCustomersAsyncForExport = createAsyncThunk<
  ClientsTableRow[],
  GetCustomersParams,
  ThunkConfig
>(
  'clients/get-all-export',
  async ({ primitiveParams, referenceParams }, { dispatch, rejectWithValue }) => {
    dispatch(setLoadingCustomers(true));
    try {
      const pParams = generateRequestParams({ ...primitiveParams, pageSize: 999 });
      const refParams = generateRefParams(referenceParams);

      const params = pParams + refParams;

      let result: ClientDTO[] = [];
      let pagination = { totalPages: 1 };

      for (let page = 1; page <= pagination.totalPages; page += 1) {
        const {
          data: { data },
          headers,
        } = await axios.get<{ data: ClientDTO[] }>(`/therapists/me/clients?page=${page}${params}`);

        result = [...result, ...data];
        pagination = headers;
      }

      return clientsToRows(result);
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    } finally {
      dispatch(setLoadingCustomers(false));
    }
  },
);
