import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '../../../../main/store/index';
import { uploadDocuments } from '../../../../shared/utils';
import { isLoading } from '../../../../shared/components/Header/store';

type attachmentDTO = {
  name: string;
  url: string;
}[];

type MessageData = {
  client_ids: number[];
  message: string;
  send_email: boolean;
  send_push: boolean;
  attachments?: attachmentDTO;
};

type MessageRequestDTO = {
  data: MessageData;
  files: File[];
};

export const sendMessage = createAsyncThunk<void, MessageRequestDTO, ThunkConfig>(
  'Clients/send-message',
  async ({ data, files }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(isLoading(true));
      const dto = data;
      if (files.length) {
        const attachments = await uploadDocuments(files);
        dto.attachments = attachments as attachmentDTO;
      }
      // await axiosV2.post(`/clients/messages`, dto);

      dispatch(isLoading(false));
    } catch (err) {
      dispatch(isLoading(false));
      rejectWithValue(err.message);
    }
  },
);
