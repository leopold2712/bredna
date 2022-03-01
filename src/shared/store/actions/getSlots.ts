import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { generateRequestParams } from '../../utils/index';
import { ThunkConfig } from '../../../main/store';
import { SlotsDTO } from '../../dtos/slots.dto';

type GetSlotsRequestDTO = {
  startTime: number;
  endTime: number;
};

export const getSlots = createAsyncThunk<SlotsDTO, GetSlotsRequestDTO, ThunkConfig>(
  'get/all slots',
  async (requestDto, { rejectWithValue }) => {
    try {
      const params = generateRequestParams(requestDto);

      const {
        data: { data },
      } = await axios.get<{ data: SlotsDTO }>(`/therapists/me/slots?${params}`);

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
