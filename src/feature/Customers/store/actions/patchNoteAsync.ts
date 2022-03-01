import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '../../../../main/store/index';
import HeyToast from '../../../../shared/components/HeyToast';
import { JourneyDTO } from '../../dtos/journey.dto';

type Request = {
  id: string | number;
  note_id: string | number | null;
  note: string;
};

export const patchNoteAsync = createAsyncThunk<JourneyDTO | undefined, Request, ThunkConfig>(
  'notes/patch-one',
  async ({ id, note_id, note }, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.patch<{ data: JourneyDTO }>(
        `therapists/me/clients/${id}/journey/notes/${note_id}`,
        {
          note,
        },
      );
      return data;
    } catch (err) {
      HeyToast.show({
        text: `Error while patching a note: ${err.response.data.message}`,
        isError: true,
      });
      return rejectWithValue(err.response.data.message);
    }
  },
);
