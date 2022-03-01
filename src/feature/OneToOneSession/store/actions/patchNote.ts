import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { JourneyDTO } from '../../../../shared/dtos/journey.dto';
import { ThunkConfig } from '../../../../main/store';
import HeyToast from '../../../../shared/components/HeyToast';

export const patchNote = createAsyncThunk<
  JourneyDTO,
  { clientId: number; noteId: number; note: string },
  ThunkConfig
>('patch/session-note', async ({ clientId, noteId, note }, { rejectWithValue }) => {
  try {
    const {
      data: { data },
    } = await axios.patch<{ data: JourneyDTO }>(
      `/therapists/me/clients/${clientId}/journey/notes/${noteId}`,
      { note },
    );

    return data;
  } catch (err) {
    HeyToast.show({ text: 'Error while patching the note', isError: true });
    console.error(err);
    return rejectWithValue(err);
  }
});
