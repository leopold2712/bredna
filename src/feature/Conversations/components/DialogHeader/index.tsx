import React from 'react';
import { Avatar, Icon } from '@shopify/polaris';
import { MobileBackArrowMajor } from '@shopify/polaris-icons';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import { setActiveRoom, setChatUI, Views } from '../../store';
import { selectActiveRoom, selectChatUI } from '../../store/selectors';
import { NoteDrawer } from '../NoteDrawer';
import { UserDrawer } from '../UserDrawer';

import styles from './dialogHeader.module.scss';

export const DialogHeader = (): JSX.Element => {
  const room = useAppSelector(selectActiveRoom);
  const chatUI = useAppSelector(selectChatUI);
  const dispatch = useAppDispatch();

  const clickBackHandler = () => {
    dispatch(setChatUI({ ...chatUI, activeView: Views.LIST }));
    dispatch(setActiveRoom(null));
  };

  const { mobileView, activeView, noteDrawerOpen } = chatUI;

  const { name } = room || { name: '' };

  const initials = name[0] + name[name.indexOf(' ') + 1];

  return (
    <div className={styles.wrapper}>
      <div className={styles.roomInfo}>
        {mobileView && activeView === Views.DIALOG && (
          <button type="button" onClick={clickBackHandler} className={styles.backButton}>
            <Icon source={MobileBackArrowMajor} />
          </button>
        )}
        <div className="fs-exclude">
          <Avatar source={room?.thumbnail} initials={initials} />
        </div>
        <div className={styles.name}>{room?.name}</div>
      </div>

      <UserDrawer />

      {noteDrawerOpen && <NoteDrawer />}
    </div>
  );
};
