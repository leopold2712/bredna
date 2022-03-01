import { ChatUserDTO } from '.';
import { ChatNoteDTO } from '../../../shared/dtos/chat.note.dto';

export type ChatMessageDTO = {
  id: number;
  sender: ChatUserDTO;
  roomId?: number | string;
  body: string;
  createdAt: string;
  sentByMe: boolean;
  comments: ChatNoteDTO[];
};
