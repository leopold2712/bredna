export enum NotificationsTabs {
  ALL,
  UNREAD,
  READ,
}

export const notificationsTabsOptions = [
  {
    id: 'all-notifications',
    content: 'All',
    panelID: 'all-notifications-list',
  },
  {
    id: 'unread-notifications',
    content: 'Unread',
    panelID: 'unread-notifications-list',
  },
  {
    id: 'read-notifications',
    content: 'Read',
    panelID: 'read-notifications-list',
  },
];
