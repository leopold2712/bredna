import type { ColumnContentType } from '@shopify/polaris';

import type { IResourceListFields } from '../../../main/interfaces';

export enum ENonIterableFieldsKeys {
  SessionType = 'session_type',
  Status = 'status',
}

export enum EIterableFieldsKeys {
  Count = 'sessions',
  Time = 'time',
  Earnings = 'earnings',
}

export const fields: IResourceListFields<EIterableFieldsKeys | ENonIterableFieldsKeys>[] = [
  { name: 'Session type', key: ENonIterableFieldsKeys.SessionType, width: 1.3 },
  { name: 'Status', key: ENonIterableFieldsKeys.Status, width: 1 },
  { name: 'Count', key: EIterableFieldsKeys.Count, width: 1 },
  { name: 'Time', key: EIterableFieldsKeys.Time, width: 1 },
  { name: 'Earnings', key: EIterableFieldsKeys.Earnings, width: 1 },
];

export const sessionDetailsTableConfig = {
  sortable: [false, false, false, true, true],
  headings: ['Client name', 'Email', 'Session date', 'Type', 'Show'],
  columnContentTypes: ['text', 'text', 'text', 'text', 'text'] as ColumnContentType[],
};

export enum ESessionDetailsKeys {
  ClientName = 'client_name',
  Email = 'email',
  Date = 'date',
  Type = 'type',
  Show = 'show',
}

export const sessionDetailsFields: IResourceListFields<ESessionDetailsKeys>[] = [
  { name: 'Client name', key: ESessionDetailsKeys.ClientName, width: 1.3 },
  { name: 'Email', key: ESessionDetailsKeys.Email, width: 1 },
  { name: 'Date', key: ESessionDetailsKeys.Date, width: 1 },
  { name: 'Type', key: ESessionDetailsKeys.Type, width: 1 },
  { name: 'Show', key: ESessionDetailsKeys.Show, width: 1 },
];
