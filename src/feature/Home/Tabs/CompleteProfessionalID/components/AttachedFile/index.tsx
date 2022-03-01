import React from 'react';
import { MobilePlusMajor, TimelineAttachmentMajor } from '@shopify/polaris-icons';
import { Icon } from '@shopify/polaris';

import styles from './attachedFile.module.scss';

interface IProps {
  file: string;
}

export const AttachedFile: React.FC<IProps> = ({ file }: IProps): JSX.Element => (
  <div className={styles.attachedFile}>
    <div className={styles.attachedFile__nameContainer}>
      <span className={styles.attachedFile__name}>
        <Icon source={TimelineAttachmentMajor} />
        <span>&nbsp;{file}</span>
      </span>
    </div>
    <div className={styles.attachedFile__icon}>
      <Icon source={MobilePlusMajor} color="base" />
    </div>
  </div>
);
