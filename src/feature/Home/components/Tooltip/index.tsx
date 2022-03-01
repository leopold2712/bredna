import { Icon } from '@shopify/polaris';
import { CircleAlertMajor } from '@shopify/polaris-icons';
import React from 'react';
import styles from './tooltip.module.scss';

type Props = {
  mobile?: boolean;
};

const WizardToolTip: React.FC<Props> = ({ mobile }: Props) => (
  <div className={mobile ? styles.mobileTooltip : styles.tooltip}>
    <div className={styles.icon}>
      <Icon source={CircleAlertMajor} />
    </div>

    <p>All information can be edited after launch</p>
  </div>
);

export default WizardToolTip;
