import React from 'react';
import { Button } from '@shopify/polaris';
import type { EducationModel } from '../../models';

import styles from './educationItem.module.scss';

interface IProps {
  index: number;
  education: EducationModel;
  editEducation: (education: EducationModel) => void;
}

export const EducationItem: React.FC<IProps> = ({
  index,
  education,
  editEducation,
}: IProps): JSX.Element => (
  <div className={`${index > 0 ? styles.bordered : ''}`}>
    <div className={styles.educationItem}>
      <div className={styles.educationItem__header}>
        <div className={styles.educationItem__years}>
          {education.start_year} - {education.end_year}
        </div>
        <Button plain onClick={() => editEducation(education)}>
          Edit
        </Button>
      </div>
      <div className={styles.educationItem__title}>
        {education.degree} - {education.major}
      </div>
      <div className={styles.educationItem__title}>{education.college}</div>
    </div>
  </div>
);
