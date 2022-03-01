import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { isLoading } from '../../../../shared/components/Header/store';
import type { ThunkConfig } from '../../../../main/store';
import type { CreateSlotDTO } from '../../dtos';
import { GetSlotsResponseDTO } from '../../dtos/getSlots.response.dto';

export const createSlot = createAsyncThunk<GetSlotsResponseDTO[], CreateSlotDTO, ThunkConfig>(
  'post/one slot',
  async (requestDto, { rejectWithValue, dispatch }) => {
    try {
      dispatch(isLoading(true));

      const {
        data: { data },
      } = await axios.post<{ data: GetSlotsResponseDTO[] }>(`/therapists/me/slots`, requestDto);

      return data;
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(isLoading(false));
    }
  },
);
