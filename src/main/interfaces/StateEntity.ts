import { ResponseHeaders } from '../../shared/dtos/network.dto';

export interface StateEntity<T> {
  list: T[];
  pagination: ResponseHeaders;
  isEmptySearch: boolean;
}
