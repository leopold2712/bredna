/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card, Stack, TextStyle, Toast } from '@shopify/polaris';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import check from '../../../../assets/images/home/check.png';
import { useAppDispatch } from '../../../../main/store/hooks';
import { setAbandoneOnboarding, setIsFirstVisit } from '../../store';
import { eliminatePolarisCardGap } from '../../utils/hacks';

import styles from './sharePage.module.scss';

export const ShareYourPage: React.FC = () => {
  const [linkToast, setLinkToast] = useState('');

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    eliminatePolarisCardGap();
  }, []);

  useEffect(() => {
    const step = localStorage.getItem('onboarding-step');
    if (step === '3') {
      localStorage.setItem('isFirstVisit', 'false');
      dispatch(setIsFirstVisit(false));
      dispatch(setAbandoneOnboarding(false));
    }
    return () => {
      localStorage.setItem('onboarding-step', '3');
    };
  }, []);

  return (
    <>
      <Card.Section
        title={<p className={styles.subtitle}>Your profile is now complete, well done!</p>}
      >
        <Stack vertical spacing="extraTight">
          <p className={styles.pageOn}>
            Our excellent partner success team will go over your profile and make sure everything is
            set up for you to succeed.
          </p>
        </Stack>
      </Card.Section>

      <div className={`${styles.section} ${styles.vertIndent1}`}>
        <p className={`${styles.subtitle}`}>What&rsquo;s Next?</p>
        <div>
          <div className={styles.nextItem}>
            <div className={styles.imgWrapper}>
              <img src={check} alt="check" />
            </div>
            <TextStyle>
              <span className={styles.itemText}>
                You will be contacted when your profile is confirmed.
              </span>
            </TextStyle>
          </div>
          <div className={styles.nextItem}>
            <div className={styles.imgWrapper}>
              <img src={check} alt="check" />
            </div>
            <TextStyle>
              <span className={styles.itemText}>
                In the meantime, check out the&nbsp;
                <a href="/live-session">live session</a>
                &nbsp;scheduling and set your availability.
              </span>
            </TextStyle>
          </div>

          <div className={styles.nextItem}>
            <div className={styles.imgWrapper}>
              <img src={check} alt="check" />
            </div>
            <TextStyle>
              <span className={styles.itemText}>
                Additionally, you can complete the&nbsp;
                <a href="/pricing">payment section</a>,&nbsp;so you are ready to start receiving
                money.
              </span>
            </TextStyle>
          </div>
        </div>
      </div>

      {linkToast && (
        <Toast
          content={linkToast}
          onDismiss={() => {
            setLinkToast('');
          }}
        />
      )}
    </>
  );
};
