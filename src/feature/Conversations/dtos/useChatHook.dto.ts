import { ChatRoomDTO, ChatMessageDTO } from '.';

export type UseChatHook = {
  rooms: ChatRoomDTO[];
  activeRoom: ChatRoomDTO;
  messages: ChatMessageDTO[];
  searchValue: string;
  joinRoom: (id: number) => void;
  leaveCurrentRoom: () => void;
  getMoreMessages: () => void;
  setSearchValue: (str: string) => void;
};
