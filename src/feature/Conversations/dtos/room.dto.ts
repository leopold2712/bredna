import { ChatMetaDTO, ChatMessageDTO, ChatUserDTO } from '.';

export type ChatRoomDTO = {
  id: number;
  name: string;
  unreadMessages: number;
  membersCount?: number;
  lastMessage?: ChatMessageDTO;
  meta?: ChatMetaDTO[];
  thumbnail: string;
  members?: ChatUserDTO[];
  status: string;
};
