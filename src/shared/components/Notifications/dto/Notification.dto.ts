import { NotificationTypeDTO } from './NotificationType.dto';

export type NotificationDTO = {
  id: number;
  type: NotificationTypeDTO;
  title: string;
  message: string;
  thumbnail: string;
  meta: {
    [key: string]: string;
  };
  is_read: boolean;
  created_at: Date;
};
