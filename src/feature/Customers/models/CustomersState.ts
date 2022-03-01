import type { ProductDTO } from '../../../shared/dtos/product.dto';
import type { TagType } from '.';
import type { ClientDTO } from '../../../shared/dtos';
import type { StateEntity } from '../../../shared/models/StateEntity';
import { ClientJourneysState } from './JourneyState';
import { SessionDTO } from '../../../shared/dtos/session.dto';

export type CustomersState = {
  customers: StateEntity<ClientDTO>;
  sessions: StateEntity<SessionDTO>;
  loadingCustomers: boolean;
  currentCustomer: ClientJourneysState;
  loadingCurrentCustomer: boolean;
  tags: TagType[];
  availableProducts: ProductDTO[];
};
