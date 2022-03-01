import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon, Stack } from '@shopify/polaris';
import { CancelSmallMinor, TimelineAttachmentMajor } from '@shopify/polaris-icons';
import type { CertificateModel } from '../../models';

import styles from './certificateItem.module.scss';
import { removeCertificate } from '../../store';

interface IProps {
  index: number;
  certificate: CertificateModel;
  editCertificate: (certificate: CertificateModel) => void;
}

export const CertificateItem: React.FC<IProps> = ({
  index,
  certificate,
  editCertificate,
}: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const handleRemoveCertificate = useCallback(() => {
    dispatch(removeCertificate(certificate));
  }, []);

  return (
    <div className={`${index > 0 ? styles.bordered : ''}`}>
      <div className={styles.certificateItem}>
        <div className={styles.certificateItem__header}>
          <div className={styles.certificateItem__title}>{certificate.title}</div>
          <Button plain onClick={() => editCertificate(certificate)}>
            Edit
          </Button>
        </div>

        <div className={styles.certificateItem__subtitle}>{certificate.subtitle}</div>

        <div className={styles.certificateItem__attachedFile}>
          <div className={styles.certificateItem__fileName}>
            <Icon source={TimelineAttachmentMajor} />
            <span>&nbsp; noun_calendar.pdf 123456</span>
          </div>
          <div style={{ cursor: 'pointer' }} onClick={handleRemoveCertificate} aria-hidden="true">
            <Icon source={CancelSmallMinor} color="base" />
          </div>
        </div>
      </div>
    </div>
  );
};
