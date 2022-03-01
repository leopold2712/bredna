import { ResponseHeaders } from '../../../shared/dtos/network.dto';
import { CustomerDTO } from './CustomerDTO';

export type GetCustomersResponse = {
  list: CustomerDTO[];
  headers: ResponseHeaders;
};
