export interface IEarningsByDate {
  date: string;
  earning: number;
}

export interface IClientMessageEarningsByDates {
  id: number;
  name: string;
  earnings_by_date: IEarningsByDate[];
}

export interface IClientMessagingEarningsByDays {
  id: number;
  name: string;
  days: number;
  earnings: number;
}
