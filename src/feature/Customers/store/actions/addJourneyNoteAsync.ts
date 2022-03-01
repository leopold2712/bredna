import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ThunkConfig } from '../../../../main/store';
import type { JourneyDTO } from '../../dtos/journey.dto';
import HeyToast from '../../../../shared/components/HeyToast';

type Res = JourneyDTO;
type Req = { id: number; note: string };

export const addJourneyNoteAsync = createAsyncThunk<Res, Req, ThunkConfig>(
  'client/addJourneyNote',
  async ({ id, note }, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.post<{ data: JourneyDTO }>(`/therapists/me/clients/${id}/journey/notes`, {
        note,
      });

      HeyToast.show({ text: 'Added successfully' });
      return data;
    } catch (e) {
      HeyToast.show({
        text: `An error occurred while adding new note: ${e.response.data.message}`,
        isError: true,
      });
      return rejectWithValue(e);
    }
  },
);
