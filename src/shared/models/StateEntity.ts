import { ResponseHeaders } from '../dtos/network.dto';

export interface StateEntity<T> {
  list: T[];
  pagination: ResponseHeaders;
  isEmptySearch: boolean;
  loading?: boolean;
}
