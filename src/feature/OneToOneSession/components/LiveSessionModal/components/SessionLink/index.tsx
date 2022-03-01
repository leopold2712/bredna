import { Link } from '@shopify/polaris';
import React from 'react';
import { LinkInput } from '../LinkInput';
import styles from '../../styles.module.scss';

type Props = {
  link: string | null;
  copySessionLink: () => void;
};

export const SessionLink = ({ link, copySessionLink }: Props): JSX.Element => (
  <div className={styles.sessionLinkContainer}>
    <div className={styles.sessionLinkContainer__header}>
      <div>
        <span className={styles.clientInformationHeader}>Session link</span>
      </div>
      <div>
        {link && (
          <span className={styles.additionalLink}>
            <Link url={link || ''} external>
              Go to link
            </Link>
          </span>
        )}
      </div>
    </div>
    <div className={styles.sessionLinkContainer__textField}>
      <LinkInput
        label="We've created a zoom link for this session"
        value={link || ''}
        onClick={copySessionLink}
        disable={!link}
      />
    </div>
  </div>
);
