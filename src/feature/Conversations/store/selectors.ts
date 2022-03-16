import { ChatPersonalInfoDTO, ChatUI } from '.';
import { RootState } from '../../../main/store/rootReducer';
import { ClientDTO } from '../../../shared/dtos/client.dto';
import { ChatMessageDTO, ChatRoomDTO } from '../dtos';

export const selectChatRooms = (state: RootState): typeof state.chat.rooms => state.chat.rooms;
export const selectActiveRoom = (state: RootState): ChatRoomDTO | null => state.chat.activeRoom;
export const selectChatLoading = (state: RootState): boolean => state.chat.loading;
export const selectChatMessages = (state: RootState): typeof state.chat.messages =>
  state.chat.messages;
export const selectChatUI = (state: RootState): ChatUI => state.chat.ui;
export const selectActiveMessage = (state: RootState): ChatMessageDTO | null =>
  state.chat.editedMessage;
export const selectClientInfo = (state: RootState): ClientDTO | null => state.chat.clientInfo;
export const selectPersonalChatInfo = (state: RootState): ChatPersonalInfoDTO =>
  state.chat.userInfo;
export const isCurrentPlansSelector = (state: RootState): boolean =>
  Boolean(state.customers.currentCustomer?.client.current_plans);
