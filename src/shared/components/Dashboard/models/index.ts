export type DashboardClient = {
  avatarRef: string;
  date: string;
  startTime: string;
  endTime: string;
};

export type DashboardMessage = {
  avatarRef: string;
  fullName: string;
  description: string;
  counter: number;
};

export enum DashboardAvailability {
  Cancelled = 'cancelled',
  Passed = 'passed',
  Booked = 'booked',
  Vacant = 'vacant',
}

export interface DashboardWeek {
  [key: string]: DashboardAvailability | string;
}

export type DashboardSchedule = {
  month: string;
  year: string;
  week: number[];
  grid: DashboardWeek[];
};
