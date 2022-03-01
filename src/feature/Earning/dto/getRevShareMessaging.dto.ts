import type { IClientMessageEarningsByDates, IClientMessagingEarningsByDays } from '../types';

export type GetRevShareMessagingDTO = {
  total_days: number;
  total_earnings: number;
  clients: Array<IClientMessageEarningsByDates | IClientMessagingEarningsByDays>;
};
