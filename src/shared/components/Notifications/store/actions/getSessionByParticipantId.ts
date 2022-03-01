import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { ThunkConfig } from '../../../../../main/store';
import type { SessionDTO } from '../../../../dtos/session.dto';
import HeyToast from '../../../HeyToast';

export const getSessionByParticipantId = createAsyncThunk<SessionDTO, string, ThunkConfig>(
  'sessions/get by participant id',
  async (id, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await axios.get<{ data: SessionDTO }>(
        `therapists/me/sessions/participants/${id}/session`,
      );

      return data;
    } catch (err) {
      HeyToast.show({ text: 'An error occured while getting a session', isError: true });
      return rejectWithValue(err);
    }
  },
);
