import { ChatMessageDTO } from '../dtos';
import { ChatClient } from './ChatClient.model';

export type RoomModel = {
  hasRoom: boolean;
  id: number | string;
  initials?: string;
  name: string;
  thumbnail: string;
  unreadMessages: number;
  lastMessage?: ChatMessageDTO;
  client: ChatClient;
};
