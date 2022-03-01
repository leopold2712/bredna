import React from 'react';
import { Icon } from '@shopify/polaris';
import { LinkMinor } from '@shopify/polaris-icons';

import styles from './styles.module.scss';

type Props = {
  label: string;
  value: string;
  disable: boolean;
  onClick: () => void;
};

export const LinkInput = ({ label, onClick, value, disable }: Props): JSX.Element => (
  <div className={`${styles.linkWrapper} ${disable ? styles.disabled : ''}`}>
    <p>{label}</p>
    <button type="button" onClick={onClick} disabled={disable}>
      <p>{value}</p>
      <Icon source={LinkMinor} {...(disable && { color: 'base' })} />
    </button>
  </div>
);
