import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ThunkConfig } from '../../../../main/store';
import type { SlotDTO, DeleteSlotRequestDTO } from '../../dtos';

export const deleteSlot = createAsyncThunk<SlotDTO[], DeleteSlotRequestDTO, ThunkConfig>(
  'delete/one slot',
  async (requestDto, { rejectWithValue }) => {
    try {
      const { id } = requestDto;

      delete requestDto.id;

      const {
        data: { data },
      } = await axios.delete<{ data: SlotDTO[] }>(`/therapists/me/slots/${id}`, {
        data: requestDto,
      });

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
