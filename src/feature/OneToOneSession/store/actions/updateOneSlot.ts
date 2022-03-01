import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { isLoading } from '../../../../shared/components/Header/store';
import type { ThunkConfig } from '../../../../main/store';
import type { SlotDTO, UpdateSlotsRequestDTO } from '../../dtos';

type RequestDTO = { dto: UpdateSlotsRequestDTO; id: string };

export const updateOneSlot = createAsyncThunk<SlotDTO[], RequestDTO, ThunkConfig>(
  'patch/one slot',
  async ({ dto, id }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(isLoading(true));

      const {
        data: { data },
      } = await axios.patch<{ data: SlotDTO[] }>(`/therapists/me/slots/${id}`, dto);

      return data;
    } catch (err) {
      return rejectWithValue(err);
    } finally {
      dispatch(isLoading(false));
    }
  },
);
