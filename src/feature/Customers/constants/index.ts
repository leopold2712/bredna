import { OptionDescriptor } from '@shopify/polaris/dist/types/latest/src/components/OptionList';
import { TabDescriptor } from '@shopify/polaris/dist/types/latest/src/components/Tabs/types';

export enum ClientsSorting {
  NAME_ASC = 'name ASC',
  NAME_DESC = 'name DESC',
  PURCHASES_COUNT_ASC = 'purchases_count ASC',
  PURCHASES_COUNT_DESC = 'purchases_count DESC',
  LAST_PURCHASE_MADE_AT_ASC = 'last_purchase_made_at ASC',
  LAST_PURCHASE_MADE_AT_DESC = 'last_purchase_made_at DESC',
  REGISTERED_AT_ASC = 'registered_at ASC',
  REGISTERED_AT_DESC = 'registered_at DESC',
}

export const clientsSortOptions: OptionDescriptor[] = [
  { label: 'Name ↓', value: ClientsSorting.NAME_ASC },
  { label: 'Name ↑', value: ClientsSorting.NAME_DESC },
  { label: 'Purchases count ↓', value: ClientsSorting.PURCHASES_COUNT_ASC },
  { label: 'Purchases count ↑', value: ClientsSorting.PURCHASES_COUNT_DESC },
  { label: 'Last purchase made at ↓', value: ClientsSorting.LAST_PURCHASE_MADE_AT_ASC },
  { label: 'Last purchase made at ↑', value: ClientsSorting.LAST_PURCHASE_MADE_AT_DESC },
  { label: 'Registered at ↓', value: ClientsSorting.REGISTERED_AT_ASC },
  { label: 'Registered at ↑', value: ClientsSorting.REGISTERED_AT_DESC },
];

export enum ClientTabs {
  Overview = 'overview',
  Journey = 'journey',
  Email = 'email',
}

export const singleClientTabs: TabDescriptor[] = [
  {
    id: ClientTabs.Overview,
    content: 'Overview',
    panelID: ClientTabs.Overview,
  },
  {
    id: ClientTabs.Journey,
    content: 'Journey',
    panelID: ClientTabs.Journey,
  },
  {
    id: ClientTabs.Email,
    content: 'Email',
    panelID: ClientTabs.Email,
  },
];
