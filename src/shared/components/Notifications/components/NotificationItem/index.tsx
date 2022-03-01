/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import classNames from 'classnames';
import { Icon } from '@shopify/polaris';
import { TickSmallMinor } from '@shopify/polaris-icons';
import { NotificationType } from '../../types/notifications.type';
import type { NotificationDTO } from '../../dto';
import { useAppDispatch } from '../../../../../main/store';
import {
  getOneSession,
  patchNotificationsStatus,
  getSessionByParticipantId,
} from '../../store/actions';
import { changeNotificationStatusLocally } from '../../store';
import { LocalLoader } from '../../../LocalLoader';

import warningNotification from '../../../../../assets/images/notifications/warning-notification.svg';
import chatNotification from '../../../../../assets/images/notifications/chat-notification.svg';
import calendarNotification from '../../../../../assets/images/notifications/calendar-notification.svg';
import purchaseNotification from '../../../../../assets/images/notifications/purchase-notification.svg';

import styles from './styles.module.scss';

type Props = {
  data: NotificationDTO;
  onClose: () => void;
};

export const NoticationItem = ({
  data: { id, type, message, created_at, meta, is_read },
  onClose,
}: Props): JSX.Element => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const [sessionLoading, setSessionLoading] = useState(false);

  const getSessionForRedirection = async (notificationType: NotificationType) => {
    setSessionLoading(true);
    if (notificationType === NotificationType.SESSION_BOOKED) {
      const { payload } = await dispatch(getSessionByParticipantId(meta.linkableId));
      setSessionLoading(false);
      return payload;
    }
    const { payload } = await dispatch(getOneSession(meta.linkableId));
    setSessionLoading(false);
    return payload;
  };

  const handleReadButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(patchNotificationsStatus({ id, is_read: !is_read }));
    dispatch(changeNotificationStatusLocally(id));
  };

  const handleNotificationAction = async () => {
    if (!is_read) {
      dispatch(patchNotificationsStatus({ id, is_read: true }));
      dispatch(changeNotificationStatusLocally(id));
    }

    onClose();

    switch (type.name) {
      case NotificationType.NEW_CLIENT:
      case NotificationType.PURCHASED_PLAN:
      case NotificationType.SET_SESSION:
      case NotificationType.CANCEL:
        return history.push(`/clients/${meta.linkableId}`);

      case NotificationType.SESSION_WILL_START:
      case NotificationType.SESSION_BOOKED: {
        const session = await getSessionForRedirection(type.name);
        return history.push(`/live-session/${meta.linkableId}`, session);
      }

      case NotificationType.SENT_MESSAGE:
        return history.push({ pathname: '/chat', state: { clientID: meta.linkableId } });

      default:
        return '';
    }
  };

  const getImgSource = () => {
    switch (type.name) {
      case NotificationType.NEW_CLIENT:
        return purchaseNotification;
      case NotificationType.SET_SESSION:
        return calendarNotification;
      case NotificationType.SESSION_BOOKED:
        return calendarNotification;
      case NotificationType.SESSION_WILL_START:
        return calendarNotification;
      case NotificationType.SENT_MESSAGE:
        return chatNotification;
      case NotificationType.PURCHASED_PLAN:
        return purchaseNotification;
      case NotificationType.CANCEL:
        return warningNotification;
      default:
        return '';
    }
  };

  const notificationClassName = classNames(styles.notificationWrapper, {
    [styles.unread]: !is_read,
  });
  const buttonClassName = classNames(styles.button, {
    [styles.active]: is_read,
    [styles.inactive]: !is_read,
  });
  const noticeText = is_read ? 'Mark as unread' : 'Mark as read';

  return (
    <div className={notificationClassName} onClick={handleNotificationAction}>
      {sessionLoading && <LocalLoader />}

      <div className={styles.icon}>
        <img src={getImgSource()} alt="icon" />
      </div>
      <div className={styles.body}>
        <div className={styles.message}>{parse(message)}</div>

        <p className={styles.time}>{moment(created_at).fromNow()}</p>
      </div>

      <div className={styles.readButton}>
        <button type="button" onClick={handleReadButton} className={buttonClassName}>
          <Icon source={TickSmallMinor} />
          <span className={styles.tooltip}>{noticeText}</span>
        </button>
      </div>
    </div>
  );
};
