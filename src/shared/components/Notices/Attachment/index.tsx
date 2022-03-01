import React from 'react';
import { Icon } from '@shopify/polaris';
import { TimelineAttachmentMajor } from '@shopify/polaris-icons';
import { v4 as uuid } from 'uuid';

import styles from './styles.module.scss';

type Props = {
  name: string;
};

export const Attachment = ({ name }: Props): JSX.Element => (
  <div className={styles.attachment} key={uuid()}>
    <div className={styles.name}>
      <Icon source={TimelineAttachmentMajor} color="subdued" />
      <p>{decodeURI(name)}</p>
    </div>
  </div>
);
