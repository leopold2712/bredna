import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { generateRequestParams } from '../../../../shared/utils/index';
import { isLoading } from '../../../../shared/components/Header/store';
import type { ThunkConfig } from '../../../../main/store';
import type { GetSlotsRequestDTO } from '../../dtos';
import { GetSlotsResponseDTO } from '../../dtos/getSlots.response.dto';

export const getSlots = createAsyncThunk<GetSlotsResponseDTO[], GetSlotsRequestDTO, ThunkConfig>(
  'get/all-slots',
  async (requestDto, { rejectWithValue, dispatch }) => {
    try {
      dispatch(isLoading(true));

      const params = generateRequestParams(requestDto);

      const {
        data: { data },
      } = await axios.get<{ data: GetSlotsResponseDTO[] }>(`/therapists/me/slots?${params}`);

      return data;
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(isLoading(false));
    }
  },
);
