import { GetRevShareRequestDTO } from './getRevShare.request.dto';

export type GetRevShareMessagingRequestDTO = GetRevShareRequestDTO &
  Partial<{
    display_by: 'days' | 'dates';
    start_date: string;
    end_date: string;
    client_name: string;
    days: number;
  }>;
