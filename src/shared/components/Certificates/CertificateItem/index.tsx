import React from 'react';
import { Button, Icon } from '@shopify/polaris';
import { MobilePlusMajor, TimelineAttachmentMajor } from '@shopify/polaris-icons';
import { v4 as uuid } from 'uuid';
import type { CertificateDTO } from '../../../dtos/certificate.dto';
import { LocalLoader } from '../../LocalLoader';

import styles from './styles.module.scss';

type Props = {
  certificate: CertificateDTO;
  index: number;
  totalLength: number;
  deleteLoading: number | null | undefined;
  handleEditCertificate: (arg?: number) => () => void;
  deleteCertificate: (arg?: number) => () => void;
};

export const CertificateItem = ({
  certificate,
  index,
  totalLength,
  handleEditCertificate,
  deleteCertificate,
  deleteLoading,
}: Props): JSX.Element => (
  <div key={uuid()} className={styles.certificateWrapper}>
    <div className={styles.certificatesEditButton}>
      <Button plain onClick={handleEditCertificate(certificate.id)}>
        Edit
      </Button>
    </div>
    <div>
      <p className={styles.certificateName}>{certificate.title}</p>
      <p className={styles.certificateNameOrganization}>{certificate.description}</p>
    </div>
    <div>
      <div className={styles.item}>
        <div className={styles.nameContainer}>
          <span className={styles.name}>
            <Icon source={TimelineAttachmentMajor} />
            <span>
              &nbsp;
              {certificate.title}
            </span>
          </span>
        </div>
        <div
          className={styles.icon}
          onClick={deleteCertificate(certificate.id)}
          role="button"
          tabIndex={0}
          onKeyDown={() => null}
        >
          <Icon source={MobilePlusMajor} color="base" />
        </div>
      </div>
    </div>
    {index !== totalLength - 1 && <div className={styles.divider} />}
    {deleteLoading === certificate.id && <LocalLoader />}
  </div>
);
