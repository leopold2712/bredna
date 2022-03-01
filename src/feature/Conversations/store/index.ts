import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientDTO } from '../../../shared/dtos/client.dto';
import { ChatMessageDTO, ChatRoomDTO } from '../dtos';
import { getClientInfo } from './actions/getCilentInfo';

export enum Views {
  LIST,
  DIALOG,
}

export type ChatPersonalInfoDTO = {
  id: number;
  name: string;
  thumbnail: string;
};

export type ChatUI = {
  mobileView: boolean;
  activeView: Views;
  noteDrawerOpen: boolean;
  userDrawerOpen: boolean;
};

type Messages = {
  list: ChatMessageDTO[];
  pagination: {
    pageNumber: number;
    totalPages: number;
    pageSize: number;
  };
  messagesLoading: boolean;
};

type ChatState = {
  rooms: {
    all: ChatRoomDTO[];
    filtered: ChatRoomDTO[];
  };
  userInfo: ChatPersonalInfoDTO;
  activeRoom: ChatRoomDTO | null;
  clientInfo: ClientDTO | null;
  activeClientID: string | null;
  editedMessage: ChatMessageDTO | null;
  messages: Messages;
  sendMessageLoading: boolean;
  loading: boolean;
  ui: ChatUI;
};

const initialPagination = {
  pageNumber: 0,
  totalPages: 0,
  pageSize: 0,
};

const initialUserInfo = {
  id: 0,
  name: '',
  thumbnail: '',
};

const initialState: ChatState = {
  rooms: {
    all: [],
    filtered: [],
  },
  messages: {
    list: [],
    pagination: initialPagination,
    messagesLoading: true,
  },
  userInfo: initialUserInfo,
  activeRoom: null,
  clientInfo: null,
  activeClientID: null,
  editedMessage: null,
  loading: true,
  sendMessageLoading: false,
  ui: {
    activeView: Views.LIST,
    mobileView: false,
    noteDrawerOpen: false,
    userDrawerOpen: false,
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<{ all: ChatRoomDTO[]; filtered: ChatRoomDTO[] }>) => {
      state.rooms = action.payload;
    },
    setActiveRoom: (state, action: PayloadAction<ChatRoomDTO | null>) => {
      state.activeRoom = action.payload;
    },
    setMessages: (state, action: PayloadAction<Messages>) => {
      state.messages = action.payload;
    },
    setMessagesLoading: (state, action: PayloadAction<boolean>) => {
      state.messages.messagesLoading = action.payload;
    },
    stopChatLoading: (state) => {
      state.loading = false;
    },
    clearChatData: (state) => {
      state.loading = true;
      state.messages.list = [];
      state.activeRoom = null;
      state.rooms = {
        all: [],
        filtered: [],
      };
      state.userInfo = initialUserInfo;
    },
    clearClient: (state) => {
      state.clientInfo = null;
    },
    setChatUI: (state, action: PayloadAction<ChatUI>) => {
      state.ui = action.payload;
    },
    setEditedMessage: (state, action: PayloadAction<ChatMessageDTO | null>) => {
      state.editedMessage = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<ChatPersonalInfoDTO>) => {
      state.userInfo = action.payload;
    },
    setSendMessageLoading: (state, action: PayloadAction<boolean>) => {
      state.sendMessageLoading = action.payload;
    },
    setActiveClientID: (state, action: PayloadAction<string | null>) => {
      state.activeClientID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClientInfo.fulfilled, (state, { payload }) => {
      state.clientInfo = payload;
    });
  },
});

export default chatSlice.reducer;

export const {
  setRooms,
  setActiveRoom,
  setMessages,
  setMessagesLoading,
  stopChatLoading,
  clearChatData,
  setChatUI,
  setEditedMessage,
  clearClient,
  setUserInfo,
  setSendMessageLoading,
  setActiveClientID,
} = chatSlice.actions;
