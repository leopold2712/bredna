import { TimeRange } from '../TimeRange.type';

export const isTimeRange = (arg: TimeRange | Date): arg is TimeRange => !!(arg as TimeRange).start;
