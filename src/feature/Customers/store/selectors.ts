import type { ProductDTO } from '../../../shared/dtos/product.dto';
import type { TagType } from '../models';
import type { RootState } from '../../../main/store/rootReducer';
import type { StateEntity } from '../../../shared/models/StateEntity';
import type { ClientDTO } from '../../../shared/dtos';
import type { JourneyDTO } from '../dtos/journey.dto';
import type { SessionDTO } from '../../../shared/dtos/session.dto';
import type { ClientSession } from '../dtos';

/* clients table info */
export const getCustomers = (state: RootState): StateEntity<ClientDTO> => state.customers.customers;
export const getTagSelector = (state: RootState): TagType[] => state.customers.tags;
export const getCustomersLoading = (state: RootState): boolean => state.customers.loadingCustomers;
export const getAvailableProducts = (state: RootState): ProductDTO[] =>
  state.customers.availableProducts;

/* selected client info */
export const selectClientInfo = (state: RootState): ClientDTO =>
  state.customers.currentCustomer.client;
export const selectClientJourneys = (state: RootState): StateEntity<JourneyDTO> =>
  state.customers.currentCustomer.journeys;
export const selectClientSessions = (state: RootState): StateEntity<ClientSession> =>
  state.customers.currentCustomer.sessionsHistory;
export const getSessionsForClients = (state: RootState): SessionDTO[] =>
  state.customers.sessions.list;
