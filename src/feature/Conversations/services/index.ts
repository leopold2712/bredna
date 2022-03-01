import { Socket, io } from 'socket.io-client';
import moment from 'moment';
import store from '../../../main/store';
import type { ChatMessageDTO, ChatRoomDTO } from '../dtos';
import type { MessageResponse } from '../models/MessageResponse';
import { sortRooms, updateRooms } from '../utils';
import {
  setActiveRoom,
  stopChatLoading,
  setMessages,
  setMessagesLoading,
  setRooms,
  setUserInfo,
  ChatPersonalInfoDTO,
  setSendMessageLoading,
  setActiveClientID,
} from '../store';
import HeyToast from '../../../shared/components/HeyToast';

export class ChatService {
  private static socket: Socket;

  private static firstCheckInTimeStamp: number;

  public static init(token: string): void {
    if (process.env.REACT_APP_CHAT_URL) {
      this.socket = io(process.env.REACT_APP_CHAT_URL, {
        query: { token },
      });
      this.subscribe();
    }
  }

  public static disconnect(): void {
    this.socket.disconnect();
  }

  public static checkIn(room: ChatRoomDTO): void {
    this.firstCheckInTimeStamp = Date.now();
    this.socket.emit('checkIn', { roomId: room.id }, ({ data }: { data: ChatRoomDTO }) => {
      store.dispatch(setActiveRoom(data));
    });
  }

  public static async connectRoom(room: ChatRoomDTO): Promise<void> {
    this.checkIn(room);
    store.dispatch(setMessagesLoading(true));
  }

  public static disconnectRoom(roomId: number | string): void {
    this.socket.emit('checkOut', { roomId });
  }

  public static updateRoom(roomId: number | string): void {
    this.socket.emit('room', { roomId });
  }

  public static getUsersRooms(): void {
    this.socket.emit('rooms');
  }

  public static getMessages(roomId: number | string, pageNumber: number): void {
    if (this.firstCheckInTimeStamp)
      this.socket.emit('messages', {
        roomId,
        pageNumber,
        firstCheckInTimeStamp: this.firstCheckInTimeStamp,
      });
  }

  public static sendMessage(roomId: number | string, body: string): void {
    if (this.socket) {
      this.socket.emit('newMessage', { roomId, body }, (res: MessageResponse) => {
        if (res.message.length > 0) {
          HeyToast.show({ text: res.message, isError: true });
        } else {
          const {
            messages: { list, pagination },
            rooms,
          } = store.getState().chat;
          const message = { ...res.data, comments: [] };
          const newMessages = [message, ...list];
          store.dispatch(setMessages({ list: newMessages, pagination, messagesLoading: false }));
          store.dispatch(setSendMessageLoading(false));
          store.dispatch(
            setRooms({
              all: this.updateRoomsAfterSend(rooms.all, message),
              filtered: this.updateRoomsAfterSend(rooms.filtered, message),
            }),
          );
        }
      });
      this.updateRoom(roomId);
    }
  }

  public static addComment(dto: {
    userId: number;
    messageId: number;
    roomId: number;
    body: string;
  }): void {
    this.socket.emit('newComment', dto);
  }

  public static updateComment(dto: {
    userId: number;
    comment: { id: number; messageId: number; body: string };
  }): void {
    this.socket.emit('updateComment', dto);
  }

  private static getUserInfo(): void {
    this.socket.emit('me');
  }

  private static clearActiveRoomUnreads() {
    const { rooms, activeRoom } = store.getState().chat;
    if (activeRoom) {
      const updatedRoom = { ...activeRoom };
      updatedRoom.unreadMessages = 0;
      const newAll: ChatRoomDTO[] = rooms.all.map((r) =>
        r.id === activeRoom?.id ? updatedRoom : r,
      );
      const newFiltered: ChatRoomDTO[] = rooms.filtered.map((r) =>
        r.id === activeRoom?.id ? updatedRoom : r,
      );
      store.dispatch(setRooms({ all: newAll, filtered: newFiltered }));
    }
  }

  private static updateRoomsAfterSend = (
    roomsData: ChatRoomDTO[],
    messageData: ChatMessageDTO,
  ): ChatRoomDTO[] => {
    const { activeRoom } = store.getState().chat;
    return sortRooms(
      roomsData.map((r) => (r.id === activeRoom?.id ? { ...r, lastMessage: messageData } : r)),
    );
  };

  private static subscribe(): void {
    /* any event log */
    this.socket.onAny((event) => {
      console.log(`got ------- ${event} -------`);
    });

    this.socket.on('connect', () => {
      console.log(`Client connected successfully`, this.socket);
      this.getUserInfo();
      this.getUsersRooms();
    });
    this.socket.on('me', (data: ChatPersonalInfoDTO) => {
      store.dispatch(setUserInfo(data));
    });
    this.socket.on('rooms', async ({ data }: { data: ChatRoomDTO[] }) => {
      store.dispatch(stopChatLoading());

      if (data) {
        store.dispatch(setRooms({ all: data, filtered: data }));
        if (!data.length) {
          store.dispatch(setMessagesLoading(false));
        }

        /* set and connect to active room */
        let activeRoom = data[0];

        const { activeClientID } = store.getState().chat;

        /*
          check if there is room which we need to connect instead of default one
          activeClientID - param which we are getting after redirect by notification click
        */
        if (activeClientID) {
          const clientRoom = data.find((room) => {
            const { members } = room;
            const client = members?.find((member) =>
              member.meta?.some(
                (param) => param.key === 'clientProfileId' && param.value === activeClientID,
              ),
            );

            return !!client;
          });

          if (clientRoom) activeRoom = clientRoom;

          store.dispatch(setActiveClientID(null));
        }

        store.dispatch(setActiveRoom(activeRoom));
        if (activeRoom) this.connectRoom(activeRoom);
      }
    });

    this.socket.on('room', (room: ChatRoomDTO) => {
      const { rooms } = store.getState().chat;
      const newRooms = {
        all: sortRooms(updateRooms([...rooms.all], room)),
        filtered: sortRooms(updateRooms([...rooms.filtered], room)),
      };
      store.dispatch(setRooms(newRooms));
    });

    this.socket.on(
      'messages',
      ({
        data,
        page,
      }: {
        data: ChatMessageDTO[];
        page: { pageNumber: number; totalPages: number };
      }) => {
        this.clearActiveRoomUnreads();
        if (page.pageNumber === 1) {
          data.sort((a, b) => (moment(a.createdAt) < moment(b.createdAt) ? 1 : -1));
          store.dispatch(
            setMessages({
              list: data,
              pagination: { ...page, pageSize: data.length },
              messagesLoading: false,
            }),
          );
        } else {
          /* concat all messages */
          const prev = store.getState().chat.messages.list;

          const list = [...prev, ...data];

          /* calculate page size */
          const pageSize = prev.length > 0 ? prev.length : data.length;

          store.dispatch(
            setMessages({ list, pagination: { ...page, pageSize }, messagesLoading: false }),
          );
        }
      },
    );

    this.socket.on('newMessage', (message: ChatMessageDTO) => {
      const { activeRoom } = store.getState().chat;
      /*
        if message from current dialog - update displayed messages
      */
      if (activeRoom && message.roomId === activeRoom.id) {
        const {
          messages: { list, pagination },
        } = store.getState().chat;
        store.dispatch(
          setMessages({ list: [message, ...list], pagination, messagesLoading: false }),
        );
      }

      if (message.roomId) this.updateRoom(message.roomId);
    });

    this.socket.on('connect_failed', () => {
      document.write('Sorry, there seems to be an issue with the connection');
    });

    this.socket.on('reconnect', () => {
      console.log('Client was reconnected successfully');
    });

    this.socket.on('reconnecting', () => {
      console.log('Client is reconnecting');
    });

    this.socket.on('reconnect_failed', () => {
      document.write('Sorry, there seems to be an issue with the connection');
      console.log("Client's attempt to reconnect failed");
    });

    this.socket.on('error', (err) => {
      document.write('Sorry, there seems to be an error');
      console.log('Error from server', err);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Client was disconnected', reason);
    });

    this.socket.on('message', (msg) => {
      console.log('Message from server', msg);
    });
  }
}
