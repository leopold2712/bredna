import React from 'react';
import { Card } from '@shopify/polaris';
import moment from 'moment';
import type { PlanDTO } from '../../../../shared/dtos/plan.dto';

import styles from './styles.module.scss';

type Props = {
  plan: PlanDTO;
};

export const PlanCard: React.FC<Props> = ({
  plan: {
    product: { name, description },
    used_credits,
    total_credits,
    expires_at,
  },
}: Props): JSX.Element => {
  const usedText = `${total_credits ? used_credits : 1}/${total_credits || 1}`;

  return (
    <Card sectioned>
      <div className={styles.planCard}>
        <div className={styles.title}>
          <p className={styles.infoTitle}>{name}</p>
          <p className={styles.infoValue}>{description}</p>
        </div>

        <div className={styles.info}>
          <p className={styles.infoTitle}>Usage</p>
          <p className={styles.infoValue}>{usedText}</p>
        </div>

        <div className={styles.info}>
          <p className={styles.infoTitle}>Valid until</p>
          <p className={styles.infoValue}>{moment(expires_at).format('MM/DD/YY')}</p>
        </div>
      </div>
    </Card>
  );
};
