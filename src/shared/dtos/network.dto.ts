export type ResponseHeaders = {
  'x-next-page': string | null;
  'x-offset': string;
  'x-page': string;
  'x-per-page': string;
  'x-prev-page': string;
  'x-total': string;
  'x-total-pages': string;
};

export enum RequestStatuses {
  Initial = 'initial',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

export type RequestStatus = `${RequestStatuses}`;
