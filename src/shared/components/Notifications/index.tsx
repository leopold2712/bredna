import React, { useState, useEffect } from 'react';
import { Popover, Image, Tabs } from '@shopify/polaris';
import InfiniteScroll from 'react-infinite-scroll-component';

import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../main/store/hooks';
import { getAllNotifications, setNotificationsRead } from './store/actions';
import { getNotifications } from './store';
import { useInterval } from '../../hooks/useInterval';
import { NotificationDTO } from './dto/Notification.dto';
import { NotificationWrapperSizes } from './constants';
import { notificationsTabsOptions, NotificationsTabs } from './constants/notificationsTabs';

import { LocalLoader } from '../LocalLoader';
import {
  NotificationHeader,
  NotificationsEmptyState,
  NoticationItem,
  ListEndMessage,
  NotificationsLoader,
} from './components';

import NotificationIcon from '../../../assets/images/notifications/Primary_fill.svg';
import NewNotificationIcon from '../../../assets/images/notifications/newNotification.svg';

import styles from './notifications.module.scss';

export const NotificationsPopover = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const { list: notifications, pagination } = useAppSelector(getNotifications);

  const [popoverActive, setPopoverActive] = useState(false);
  const [firstOpen, setIsFirstOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState(NotificationsTabs.ALL);
  const [tabLoading, setTabLoading] = useState(false);
  const [notificationsList, setNotificationsList] = useState<NotificationDTO[]>([]);
  const [activatorIcon, setActivatorIcon] = useState(NotificationIcon);
  const [tablePage, setTablePage] = useState(1);

  const nextPage = pagination['x-next-page'];

  const togglePopoverActive = () => setPopoverActive((prev) => !prev);

  const handleMarkAllAsRead = () => {
    dispatch(setNotificationsRead());
    setNotificationsList([]);
    setTablePage(1);
    setTimeout(() => {
      dispatch(getAllNotifications({ page: tablePage }));
    }, 1500);
  };

  const handleLoadMore = () => {
    setTablePage(Number(nextPage));
  };

  const getActivatorIcon = () => {
    if (
      selectedTab === NotificationsTabs.ALL &&
      (sessionStorage.getItem(`${user?.email}-notifications-total`) === pagination['x-total'] ||
        !user)
    )
      return NotificationIcon;
    const newUnread = notifications.find((notification) => notification.is_read === false);
    if (newUnread) {
      return NewNotificationIcon;
    }
    return NotificationIcon;
  };

  const handleTabSelect = async (arg: NotificationsTabs) => {
    setTabLoading(true);
    setSelectedTab(arg);
    await dispatch(
      getAllNotifications({
        page: 1,
        ...(arg !== NotificationsTabs.ALL && { status: NotificationsTabs[arg].toLowerCase() }),
      }),
    );
    setTabLoading(false);
  };

  useEffect(() => {
    dispatch(getAllNotifications({ page: tablePage }));
  }, [tablePage]);

  useInterval(() => {
    dispatch(
      getAllNotifications({
        page: tablePage,
        ...(selectedTab !== NotificationsTabs.ALL && {
          status: NotificationsTabs[selectedTab].toLowerCase(),
        }),
      }),
    );
  }, 30000);

  const saveNotificationsTotal = () => {
    if (!user) return;

    if (sessionStorage.getItem(`${user.email}-notifications-total`) !== pagination['x-total'])
      sessionStorage.setItem(`${user.email}-notifications-total`, pagination['x-total']);
  };

  useEffect(() => {
    setNotificationsList(notifications);

    if (selectedTab === NotificationsTabs.ALL) {
      const icon = getActivatorIcon();
      saveNotificationsTotal();
      setActivatorIcon(icon);
    }
  }, [notifications]);

  useEffect(() => {
    if (firstOpen) setIsFirstOpen(false);
    if (!popoverActive && !firstOpen) {
      setActivatorIcon(NotificationIcon);

      /* synthetic delay to wait while SP animation is done */
      setTimeout(() => {
        setSelectedTab(NotificationsTabs.ALL);
      }, 500);
    }
  }, [popoverActive]);

  const height =
    notificationsList.length === 0
      ? NotificationWrapperSizes.EMPTY
      : NotificationWrapperSizes.WITH_CONTENT;

  const loaderHeight = `calc(${height} - 110px)`;

  const activator = (
    <button className={styles.popover__activator} type="button" onClick={togglePopoverActive}>
      <Image source={activatorIcon} alt="H" />
    </button>
  );

  return (
    <Popover
      fullHeight
      fluidContent
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
      preferredAlignment="right"
    >
      <div className={styles.popover__wrapper} style={{ height }}>
        <Popover.Pane>
          <NotificationHeader
            handleMarkAllAsRead={handleMarkAllAsRead}
            disableMarkAll={notificationsList.length === 0}
          />

          <Tabs tabs={notificationsTabsOptions} selected={selectedTab} onSelect={handleTabSelect} />

          {notificationsList.length === 0 ? (
            <NotificationsEmptyState />
          ) : (
            <div className="tabs-table">
              <div id="scrollableDiv" className={styles.popover__scrollable}>
                {tabLoading ? (
                  <div className={styles.loaderWrapper} style={{ height: loaderHeight }}>
                    <LocalLoader />
                  </div>
                ) : (
                  <InfiniteScroll
                    next={handleLoadMore}
                    hasMore={!!nextPage}
                    endMessage={ListEndMessage}
                    loader={NotificationsLoader}
                    dataLength={notificationsList.length}
                    scrollableTarget="scrollableDiv"
                  >
                    {notifications.map((n) => (
                      <NoticationItem data={n} key={uuid()} onClose={togglePopoverActive} />
                    ))}
                  </InfiniteScroll>
                )}
              </div>
            </div>
          )}
        </Popover.Pane>
      </div>
    </Popover>
  );
};
