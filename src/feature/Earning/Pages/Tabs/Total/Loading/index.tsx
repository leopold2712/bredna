import React, { FC } from 'react';
import { Card, SkeletonBodyText, Spinner } from '@shopify/polaris';

import { totalColumns } from '../../../../constants';

import styles from '../styles.module.scss';

export const Loading: FC = (): JSX.Element => (
  <div className={styles.total__card_wrapper}>
    <Card>
      <Card.Section>
        <div className={styles.card__main}>
          <h3 className={styles.card__title_loading}>
            <SkeletonBodyText lines={1} />
          </h3>
          <div className={styles.card__circle_wrapper}>
            <div className={styles.card__circle_loading}>
              <Spinner />
            </div>
          </div>
          <div className={styles.info__wrapper}>
            {totalColumns.map((el) => (
              <div className={styles.info__element}>
                <div className={styles.info__color_square} style={{ background: el.color }} />
                <div className={styles.info__text_wrapper}>
                  <p className={styles.info__title}>{el.title}</p>
                  <p className={styles.info__subtitle}>{el.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.card__footer}>Including both show & no-show upto current date</div>
      </Card.Section>
    </Card>
  </div>
);
