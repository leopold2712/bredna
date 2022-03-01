export enum MenuPages {
  None = 'none',
  Home = '/home',
  Clients = '/clients',
  Chat = '/chat',
  Analytics = '/analytics',
  VOD = '/vod',
  VodCollection = '/vod/categories',
  Coupons = '/discounts',
  Leads = '/leads',
  LiveSession = '/live-session',
  MyProfile = '/my-profile',
  Pricing = '/pricing',
  Settings = '/settings',
  SettingsLegal = '/settings/legal',
  SettingsNotifications = '/settings/notifications',
  SettingsPayments = '/settings/payments',
  Terms = '/terms-of-use',
  Privacy = '/privacy',
  Earning = '/earning',
}
export type MenuActivePage = `${MenuPages}`;

export enum MenuTabs {
  None = 'none',
  Overview = 'overview',
  Experts = 'experts',
  Gallery = 'gallery',
}
export type MenuActiveTab = `${MenuTabs}`;

export enum MenuSections {
  None = 'none',
  Dashboards = 'dashboards',
  Reports = 'reports',
}
export type MenuActiveSection = `${MenuSections}`;

export type SideMenuState = {
  menuActivePage: MenuActivePage;
  menuActiveTab: MenuActiveTab;
  menuActiveSection: MenuActiveSection;
  itemId: number;
  selectedHub: number;
};
