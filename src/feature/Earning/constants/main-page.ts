import { TabDescriptor } from '@shopify/polaris/dist/types/latest/src/components/Tabs/types';

enum tabsOptions {
  Total = 'Total',
  Sessions = 'Sessions',
  Messaging = 'Messaging',
  Pricing = 'Pricing',
}

export const tabs: TabDescriptor[] = Object.values(tabsOptions).map((name: string) => ({
  id: name,
  content: name,
  panelID: name,
}));
