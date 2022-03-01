import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import HeyToast from '../../../../shared/components/HeyToast';

import type { StateEntity } from '../../../../shared/models/StateEntity';
import type { JourneyDTO } from '../../dtos/journey.dto';
import type { ThunkConfig } from '../../../../main/store';

type Res = StateEntity<JourneyDTO>;

type Req = {
  id: number;
  page: number;
  offset?: number;
};

export const getClientJourneysAsync = createAsyncThunk<Res, Req, ThunkConfig>(
  'client/journeys',
  async ({ id, page, offset }, { rejectWithValue, getState }) => {
    try {
      const prevData = getState().customers.currentCustomer.journeys;

      const {
        data: { data },
        headers,
      } = await axios.get<{ data: JourneyDTO[] }>(`/therapists/me/clients/${id}/journey`, {
        params: {
          page,
          page_size: 25,
          offset,
        },
      });

      return {
        list: data,
        pagination: headers,
        isEmptySearch: (prevData.list.length && !data.length) || prevData.isEmptySearch,
        loading: false,
      };
    } catch (e) {
      HeyToast.show({
        text: `Error while getting client's journeys: ${e.response.data.message}`,
        isError: true,
      });
      return rejectWithValue(e);
    }
  },
);
