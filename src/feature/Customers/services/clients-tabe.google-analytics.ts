import { AnalyticsEventObject, AnalyticsService } from '../../../shared/services/analytics';

export enum GAClientsTableTriggers {
  CLIENTS_FILTER_INPUT,
  CLIENTS_FILTER_REMOVE_RESULT,
  CLIENTS_PLAN,
  CLIENT_NEXT,
  CLIENTS_TAG,
  CLIENTS_SINGLE_CLIENT,
  CLIENTS_PAGINATION,
  CLIENTS_EXPORT,
}

const GAClientsTableEvents: { [key in GAClientsTableTriggers]: AnalyticsEventObject } = {
  [GAClientsTableTriggers.CLIENTS_FILTER_INPUT]: {
    category: 'clients',
    action: 'clients_filter_input',
  },
  [GAClientsTableTriggers.CLIENTS_FILTER_REMOVE_RESULT]: {
    category: 'clients',
    action: 'clients_filter_remove_result',
  },
  [GAClientsTableTriggers.CLIENTS_PLAN]: {
    category: 'clients',
    action: 'clients_plan ',
  },
  [GAClientsTableTriggers.CLIENT_NEXT]: {
    category: 'clients',
    action: 'client_next',
  },
  [GAClientsTableTriggers.CLIENTS_TAG]: {
    category: 'clients',
    action: 'clients_tag',
  },
  [GAClientsTableTriggers.CLIENTS_SINGLE_CLIENT]: {
    category: 'clients',
    action: 'clients_single_client',
  },
  [GAClientsTableTriggers.CLIENTS_PAGINATION]: {
    category: 'clients',
    action: 'clients_pagination ',
  },
  [GAClientsTableTriggers.CLIENTS_EXPORT]: {
    category: 'clients',
    action: 'clients_export',
  },
};

export const clientsTableAnalyticsLog = (arg: GAClientsTableTriggers, label?: string) => (): void =>
  AnalyticsService.track({ ...GAClientsTableEvents[arg], ...(label !== undefined && { label }) });
