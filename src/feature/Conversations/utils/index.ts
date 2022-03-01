import moment from 'moment';
import { ChatRoomDTO } from '../dtos';
import { RoomModel } from '../models/Room.model';

export const getInitials = (name: string): string | undefined => {
  const [firstname, lastname] = name.split(' ');

  if (!lastname) return firstname.slice(0, 2);

  if (firstname && lastname) return firstname[0] + lastname[0];

  return undefined;
};

export const sortRooms = (rooms: ChatRoomDTO[]): ChatRoomDTO[] => {
  const sorted = [...rooms];
  return sorted.sort((a, b) => {
    if (!a.lastMessage && !b.lastMessage) return b.name > a.name ? -1 : 1;
    if (a.lastMessage && !b.lastMessage) return -1;
    if (!a.lastMessage && b.lastMessage) return 1;
    if (a.lastMessage && b.lastMessage) {
      if (moment(b.lastMessage?.createdAt) === moment(a.lastMessage?.createdAt))
        return b.name > a.name ? -1 : 1;
      return moment(b.lastMessage?.createdAt) > moment(a.lastMessage?.createdAt) ? 1 : -1;
    }
    return 0;
  });
};

export const sortRoomsByClientName = (rooms: RoomModel[]): RoomModel[] => {
  const sorted = [...rooms];
  return sorted.sort((a, b) =>
    a.client.name.toLowerCase() > b.client.name.toLowerCase() ? 1 : -1,
  );
};

export const updateRooms = (
  rooms: ChatRoomDTO[],
  room: ChatRoomDTO,
  createdRoomId?: number | string,
): ChatRoomDTO[] =>
  rooms.map((r) => {
    if (r.id === room.id || r.id === createdRoomId) {
      return {
        ...r,
        id: room.id,
        unreadMessages: room.unreadMessages,
        lastMessage: room.lastMessage,
      };
    }

    return r;
  });
