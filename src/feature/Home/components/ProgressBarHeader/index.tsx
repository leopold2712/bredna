import { Card, DisplayText, ProgressBar } from '@shopify/polaris';
import React from 'react';
import { ProgressBarTitles } from '../ProgressBarTitles';
import styles from './progressBarHeader.module.scss';

type Props = {
  progress: number;
  activeStep: number;
  titles: string[];
};

const ProgressBarHeader: React.FC<Props> = ({ progress, activeStep, titles }: Props) => (
  <div className={styles.homeWizard__header}>
    <Card.Section>
      <div className={styles.title}>
        <DisplayText size="large">
          <span className={styles.titleText}>Great to have you onboard!</span>
        </DisplayText>
      </div>
      <ProgressBar progress={progress} size="small" />
      <ProgressBarTitles titles={titles} activeStep={activeStep} />
    </Card.Section>
    <div className={styles.dividerCnt}>
      <div className={styles.divider} />
    </div>
  </div>
);

export default ProgressBarHeader;
