import { ResponseHeaders } from '../../../shared/dtos/network.dto';
import type { CustomerDTO } from '../dtos/CustomerDTO';

export type Customers = {
  list: CustomerDTO[];
  pagination: ResponseHeaders;
};
