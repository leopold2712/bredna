import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { JourneyDTO } from '../../../../shared/dtos/journey.dto';
import { ThunkConfig } from '../../../../main/store';
import HeyToast from '../../../../shared/components/HeyToast';

export const getSessionNotes = createAsyncThunk<
  JourneyDTO,
  { sessionId: number; clientId: number },
  ThunkConfig
>('get/session-notes', async ({ sessionId, clientId }, { rejectWithValue }) => {
  try {
    const {
      data: { data },
    } = await axios.get<{ data: JourneyDTO }>(
      `/therapists/me/sessions/${sessionId}/participants/${clientId}/notes`,
    );

    return data;
  } catch (err) {
    HeyToast.show({ text: 'Error while getting notes', isError: true });
    console.error(err);
    return rejectWithValue(err);
  }
});
