import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ThunkConfig } from '../../../../main/store';
import { JourneyDTO } from '../../../../shared/dtos/journey.dto';

export const addNote = createAsyncThunk<
  JourneyDTO,
  { sessionId: number; clientId: number; note: string },
  ThunkConfig
>('post/new note', async ({ sessionId, clientId, note }, { rejectWithValue }) => {
  try {
    const {
      data: { data },
    } = await axios.post<{ data: JourneyDTO }>(
      `/therapists/me/sessions/${sessionId}/participants/${clientId}/notes`,
      { note },
    );

    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
