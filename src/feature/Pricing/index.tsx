import { Layout, Link, Page } from '@shopify/polaris';
import React from 'react';

import session from '../../assets/images/pricing/session.svg';
import session_corner from '../../assets/images/pricing/session_corner.svg';
import messaging from '../../assets/images/pricing/messaging.svg';
import messaging_corner from '../../assets/images/pricing/messaging_corner.svg';
import point from '../../assets/images/pricing/point.svg';

import styles from './pricing.module.scss';

const Pricing: React.FC = (): JSX.Element => (
  <Page>
    <Layout>
      <Layout.Section>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.header__title}>Pricing</div>
            <div className={styles.header__description}>
              The money you make with brenda depends on your availabliity and interactions with
              clients.
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.body__title}>How earnings are calculated?</div>
            <div className={styles.body__description}>
              We will always be clear when it comes to money. Our models are as easy and simple as
              possible to provide you a transparent experience.
            </div>
          </div>

          <div className={styles.cards}>
            <div className={styles.card}>
              <img className={styles.card__pic} src={session} alt="" />
              <img className={styles.card__corner} src={session_corner} alt="" />
              <div className={styles.card__price}>$45.00 per hour</div>
              <div className={styles.card__text}>Session time - 50 minutes</div>
            </div>

            <div className={styles.card}>
              <img className={styles.card__pic} src={messaging} alt="" />
              <img className={styles.card__corner} src={messaging_corner} alt="" />
              <div className={styles.card__price}>$5.00 per client per day</div>
              <div className={styles.card__text}>
                Minimum of 3 interactions between therapist and user
              </div>
            </div>
          </div>

          <div className={styles.points}>
            <div className={styles.point}>
              <div className={styles.point__imgCnt}>
                <img className={styles.point__img} src={point} alt="" />
              </div>
              <span className={styles.point__text}>
                Trial session: calculated by the hour and covered by the platform
              </span>
            </div>
            <div className={styles.point}>
              <div className={styles.point__imgCnt}>
                <img className={styles.point__img} src={point} alt="" />
              </div>
              <span className={styles.point__text}>
                Client no-show: therapist will still receive payment.
              </span>
            </div>
            <div className={styles.point}>
              <div className={styles.point__imgCnt}>
                <img className={styles.point__img} src={point} alt="" />
              </div>
              <span className={styles.point__text}>
                Up to 6 hours prior to the session - can cancel/reschedule with no penalty
              </span>
            </div>
          </div>

          <div className={styles.note}>
            <div className={styles.note__title}>Please note client cancellation policy</div>
            <div className={styles.note__text}>
              Cancellations and rescheduling is permitted up to six hours before the scheduled time.
              No-shows or cancellations under 6 hours, will forfeit the session.
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.footer__text}>
              For any further questions please write us{' '}
              <Link url="https://www.brenda.app/contact">here</Link>
            </div>
          </div>
        </div>
      </Layout.Section>
    </Layout>
  </Page>
);

export default Pricing;
