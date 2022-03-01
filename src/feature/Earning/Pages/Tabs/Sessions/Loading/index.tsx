import React, { FC } from 'react';
import { Button } from '@shopify/polaris';
import classNames from 'classnames';

import { TableHeader } from '../../../../../../shared/components/TableHeader';
import { fields } from '../../../../constants';
import { SessionsTable } from '../../../../components/SessionsTable';
import { TableLoading } from '../TableLoading';
import { useCustomWindowWidth } from '../../../../../../shared/hooks/useCustomWindowWidth';

import styles from '../styles.module.scss';

export const Loading: FC = (): JSX.Element => {
  const { mobileView } = useCustomWindowWidth();

  const sessionDetailsClassNames = classNames(
    styles.tables__session_details,
    'tables__session-details',
  );

  return (
    <div className={styles.sessions__tables}>
      <div className={styles.tables__earning_table}>
        <TableHeader fields={fields} isSession />
        <SessionsTable fields={fields} isUnderline />

        {mobileView && <TableHeader fields={fields} isSession />}
        <SessionsTable fields={fields} />
      </div>

      <div className={sessionDetailsClassNames}>
        <div className={styles.session_details__header}>
          <div className={styles.session_details__title_container}>
            <h3>Session details</h3>
            <p>( Showing 3 out of 3)</p>
          </div>
          <Button>Export</Button>
        </div>

        <TableLoading />
      </div>
    </div>
  );
};
