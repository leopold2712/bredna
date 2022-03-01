import React from 'react';
import { Link } from '@shopify/polaris';
import classNames from 'classnames';

import { getPlanName, getPlanExpiration, getPlanUsage } from '../../../../utils/getPlanName';

import type { ClientDTO } from '../../../../../../shared/dtos/client.dto';

import styles from '../../styles.module.scss';

type Props = {
  client: ClientDTO;
};

export const LiveSessionClientInformation = ({ client }: Props): JSX.Element => (
  <div className={styles.clientContainer}>
    <div className={styles.clientContainer__subContainer}>
      <div className={styles.clientContainer__client}>
        <span className={styles.clientInformationHeader}>Client information</span>
        <span className={styles.additionalLink}>
          <Link url={`/clients/${client.id}`}>Go to client page</Link>
        </span>
      </div>
    </div>

    <div className={styles.clientContainer__subContainer}>
      <div>
        <span>Name: </span>
        <span className={classNames(styles.clientInformationItem, 'fs-mask')}>
          {client.name.length > 0 ? client.name : 'Not specified'}
        </span>
      </div>

      {client.current_plans.map((p, index) => (
        <div>
          <div>
            <span>Plan: </span>
            <span className={styles.clientInformationItem}>{getPlanName(p)}</span>
          </div>

          <div>
            <span>Expiration date: </span>
            <span className={styles.clientInformationItem}>
              {getPlanExpiration(p, client.current_plans.length)}
            </span>
          </div>

          <div>
            <span>Current session: </span>
            <span className={styles.clientInformationItem}>
              {getPlanUsage(p, client.current_plans.length)}
            </span>
          </div>

          {index !== client.current_plans.length - 1 && <div className={styles.plansDivider} />}
        </div>
      ))}
    </div>
  </div>
);
