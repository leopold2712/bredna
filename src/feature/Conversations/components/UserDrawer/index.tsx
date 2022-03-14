import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Icon, TextField, Button } from '@shopify/polaris';
import { MobileCancelMajor, MobileVerticalDotsMajor } from '@shopify/polaris-icons';
// import { v4 as uuidv4 } from 'uuid';
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

  const handleTagInputChange = useCallback(
    (newTagInputValue) => setTagInputValue(newTagInputValue),
    [],
  );

  const toggleOpen = () => setIsOpen((prev) => !prev);
  useOutsideListener(wrapper, toggleOpen);
  return isOpen ? (
    <div className={classNames(styles.card, 'fs-unmask')} ref={wrapper}>
      <div className={styles.header}>
        {/* <p className={styles.modalTitle}>More info</p> */}
        <button className={styles.action} type="button" onClick={toggleOpen}>
          <Icon source={MobileCancelMajor} />
        </button>
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.user}>
          <p>Client ID</p>
          <div className={styles.userContent}>
            <div
              style={{
                background: `url(${activeRoom?.thumbnail || user})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              className={classNames(styles.userImage, 'fs-exclude')}
            />
            <p className={classNames(styles.username, 'fs-mask')}>
              {client?.name || activeRoom?.name}
            </p>
          </div>
        </div>
        <div className={styles.tags}>
          <p>Tags</p>
          <div className={styles.tagsContent}>
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
          <p className={styles.emergContactHeader}>Energancy contact</p>
          <div className={styles.emergContactContent}>
            <p>Dan Hamphry</p>
            <p>+972 5473884293</p>
          </div>
        </div>
        <div className={styles.reportButton}>
          <Button fullWidth>Report</Button>
        </div>
        {/* <div className={styles.plans}>
          {plans.length > 0 ? (
            plans.map((plan) => (
              <div className={styles.plan__wrapper} key={uuidv4()}>
                <div className={styles.plan}>
                  <div className={styles.planCnt}>
                    <div className={styles.planHeader}>Plan type</div>
                    <div className={styles.planSessions}>
                      {`${plan.product.name} ${
                        plan.total_credits ? `${plan.total_credits} sessions` : ''
                      }`}
                    </div>
                    <ul className={`${styles.planSessions} ${styles.planLeftIndent}`}>
                      <li>{`${getValidityTypeName(plan.product.validity_type)} billed`}</li>
                      <li>{`Valid until ${moment(plan.expires_at).format('YYYY-MM-DD')}`}</li>
                      <li>{`${plan.used_credits} sessions used`}</li>
                      {plan.total_credits && (
                        <li>{`${plan.total_credits - plan.used_credits} sessions left`}</li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className={styles.date}>
                  <div className={styles.dateCnt}>
                    <div className={styles.dateHeader}>Last interaction date</div>
                    <div className={styles.dateLine}>
                      {plan.last_interaction_made_at
                        ? moment(plan.last_interaction_made_at).format('YYYY-MM-DD')
                        : 'Not specified'}
                    </div>
                  </div>
                </div>

                <div className={styles.date}>
                  <div className={styles.dateCnt}>
                    <div className={styles.dateHeaderCnt}>
                      <div className={styles.dateHeader}>Next interaction date</div>
                      @future feature
                       {plan.next_interaction_expected_at && (
                      <div className={styles.dateHeaderLink}>Link</div>
                    )}
                    </div>
                    <div className={styles.dateLine}>
                      {plan.next_interaction_expected_at
                        ? moment(plan.next_interaction_expected_at).format('YYYY-MM-DD')
                        : 'Not specified'}
                    </div>
                    @future feature 
                    {plan.next_interaction_expected_at && (
                    <div className={`${styles.dateLine} ${styles.dateUnderline}`}>
                      Send reminder to schedule
                    </div>
                  )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.userError}>Invalid client ID</p>
          )}
        </div> */}
        {loading && <UserDrawerLoading />}
      </div>
    </div>
  ) : (
    <button type="button" onClick={toggleOpen} className={styles.action} disabled={!activeRoom}>
      <Icon source={MobileVerticalDotsMajor} />
    </button>
  );
};
