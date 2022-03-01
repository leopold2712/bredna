import React from 'react';
import { Button } from '@shopify/polaris';

import styles from './styles.module.scss';

type Props = {
  selectedDays: string[];
  handleDaySelect: (day: string) => void;
};

export const DaysRepeat = ({ selectedDays, handleDaySelect }: Props): JSX.Element => (
  <div className={`${styles.availabilitySection} ${styles.groupButtons}`}>
    <div className={selectedDays.includes('sun') ? styles.selectedButtonDay : ''}>
      <Button onClick={() => handleDaySelect('sun')}>S</Button>
    </div>
    <div className={selectedDays.includes('mon') ? styles.selectedButtonDay : ''}>
      <Button onClick={() => handleDaySelect('mon')}>M</Button>
    </div>
    <div className={selectedDays.includes('tue') ? styles.selectedButtonDay : ''}>
      <Button onClick={() => handleDaySelect('tue')}>T</Button>
    </div>
    <div className={selectedDays.includes('wed') ? styles.selectedButtonDay : ''}>
      <Button onClick={() => handleDaySelect('wed')}>W</Button>
    </div>
    <div className={selectedDays.includes('thu') ? styles.selectedButtonDay : ''}>
      <Button onClick={() => handleDaySelect('thu')}>T</Button>
    </div>
    <div className={selectedDays.includes('fri') ? styles.selectedButtonDay : ''}>
      <Button onClick={() => handleDaySelect('fri')}>F</Button>
    </div>
    <div className={selectedDays.includes('sat') ? styles.selectedButtonDay : ''}>
      <Button onClick={() => handleDaySelect('sat')}>S</Button>
    </div>
  </div>
);
