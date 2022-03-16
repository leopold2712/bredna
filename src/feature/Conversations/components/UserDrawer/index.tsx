import React, { useRef, useState, useEffect } from 'react';
import { Icon, TextField, Button } from '@shopify/polaris';
import { MobileCancelMajor, MobileVerticalDotsMajor } from '@shopify/polaris-icons';
import classNames from 'classnames';
import HeyToast from '../../../../shared/components/HeyToast';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import { selectActiveRoom, selectClientInfo } from '../../store/selectors';
import { useOutsideListener } from '../../../../shared/hooks/useOutsideListener';
import { getClientInfo } from '../../store/actions';
import { UserDrawerLoading } from '../UserDrawerLoading';
import { clearClient } from '../../store';

import type { ValidityType } from '../../../../shared/constants/validityTypes';

import user from '../../../../assets/images/chat/avatar.png';
import styles from './userCard.module.scss';

export const UserDrawer = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const wrapper = useRef(null);

  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [tagInputValue, setTagInputValue] = useState('');

  const activeRoom = useAppSelector(selectActiveRoom);
  const client = useAppSelector(selectClientInfo);

  const getValidityTypeName = (type: ValidityType) => type.charAt(0).toUpperCase() + type.slice(1);

  const fetchClient = async () => {
    if (activeRoom && activeRoom.members) {
      const member = activeRoom.members[0];
      if (member && member.meta) {
        const metaId = member.meta.find((item) => item.key === 'clientProfileId');
        if (metaId) {
          try {
            await dispatch(getClientInfo(+metaId.value));
          } catch (err) {
            HeyToast.show({ text: "An error occured while getting client's info ", isError: true });
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchClient();
    } else {
      dispatch(clearClient());
      setLoading(true);
    }
  }, [isOpen]);

  const plans = client && client.current_plans ? client.current_plans : [];

  const handleTagInputChange = (newTagInputValue: string) => setTagInputValue(newTagInputValue);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  useOutsideListener(wrapper, toggleOpen);
  return isOpen ? (
    <div className={classNames(styles.card__position, styles.card, 'fs-unmask')} ref={wrapper}>
      <div className={styles.action_icon__wrapper}>
        <button className={styles.action_icon} type="button" onClick={toggleOpen}>
          <Icon source={MobileCancelMajor} />
        </button>
      </div>
      <div>
        <div className={`${styles.user} ${styles.user__position}`}>
          <p>Client ID</p>
          <div className={styles.user__content}>
            <div
              style={{
                background: `url(${activeRoom?.thumbnail || user})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              className={classNames(styles.user__image, 'fs-exclude')}
            />
            <p className={classNames(styles.user__name, 'fs-mask')}>
              {client?.name || activeRoom?.name}
            </p>
          </div>
        </div>
        <div className={styles.tags}>
          <p>Tags</p>
          <div>
            <TextField
              label="tags"
              labelHidden
              onChange={handleTagInputChange}
              value={tagInputValue}
              connectedRight={<Button disabled>add</Button>}
            />
          </div>
        </div>
        <div className={styles.emergContact}>
          <p className={styles.emergContact__header}>Energancy contact</p>
          <div className={styles.emergContact__content}>
            <p>Dan Hamphry</p>
            <p>+972 5473884293</p>
          </div>
        </div>
        <div className={styles.reportButton}>
          <Button fullWidth>Report</Button>
        </div>
        {loading && <UserDrawerLoading />}
      </div>
    </div>
  ) : (
    <button
      type="button"
      onClick={toggleOpen}
      className={styles.action_icon}
      disabled={!activeRoom}
    >
      <Icon source={MobileVerticalDotsMajor} />
    </button>
  );
};
