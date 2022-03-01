import { NotificationDTO } from './Notification.dto';
import { ResponseHeaders } from '../../../dtos/network.dto';

export type GETNotificationsResponse = {
  list: NotificationDTO[];
  pagination: ResponseHeaders;
};
