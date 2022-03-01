import React from 'react';
import { Icon } from '@shopify/polaris';
import { ChevronUpMinor, ChevronDownMinor } from '@shopify/polaris-icons';

import styles from './styles.module.scss';

type Props = {
  label: string;
  isOpen: boolean;
  onClick: () => void;
};

export const CollapseButton = ({ label, isOpen, onClick }: Props): JSX.Element => (
  <button type="button" onClick={onClick} className={styles.collapseButton}>
    <p>{label}</p>
    <Icon source={isOpen ? ChevronUpMinor : ChevronDownMinor} color="base" />
  </button>
);
