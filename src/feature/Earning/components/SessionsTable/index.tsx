import React, { FC } from 'react';
import classNames from 'classnames';
import { SkeletonBodyText } from '@shopify/polaris';

import { EIterableFieldsKeys, ENonIterableFieldsKeys } from '../../constants/sessions';
import { useCustomWindowWidth } from '../../../../shared/hooks/useCustomWindowWidth';

import type { TSessionsData } from '../../types';
import type { IResourceListFields } from '../../../../main/interfaces';

import styles from './styles.module.scss';

type TProps = {
  fields: IResourceListFields<EIterableFieldsKeys | ENonIterableFieldsKeys>[];
  data?: TSessionsData;
  isUnderline?: boolean;
};

export enum EStatuses {
  Show = 'Show',
  NoShow = 'No-Show',
  Total = 'Total',
}

const LoadingRow = () => (
  <div className={styles.loading_row}>
    <SkeletonBodyText lines={1} />
  </div>
);

export const SessionsTable: FC<TProps> = ({ fields, data, isUnderline }: TProps) => {
  const { mobileView, desktopView } = useCustomWindowWidth();

  const tableSessionClassNames = classNames(styles.table_session, {
    [styles.underline]: isUnderline,
  });

  const filterFields = (
    array: IResourceListFields<EIterableFieldsKeys | ENonIterableFieldsKeys>[],
  ) =>
    array.filter(
      (item) =>
        item.key !== ENonIterableFieldsKeys.SessionType &&
        item.key !== ENonIterableFieldsKeys.Status,
    ) as IResourceListFields<EIterableFieldsKeys>[];

  const fillColumns = (object: TSessionsData, item: IResourceListFields<EIterableFieldsKeys>) =>
    Object.entries(object[item.key]).map(([key, value]) => (
      <div>{desktopView ? value : key !== 'total' && value}</div>
    ));

  return (
    <div className={tableSessionClassNames}>
      <div className={styles.session_type} style={{ flex: `${fields[0].width} 1` }}>
        <p className={styles.session_type__title}>{isUnderline ? 'Session' : 'Trial'}</p>
        <div className={styles.session_type__card}>
          <p>{`${isUnderline ? '50' : '25'} min`}</p>
          <p>session</p>
        </div>
      </div>
      <div className={styles.table_session__column} style={{ flex: `${fields[1].width} 1` }}>
        {mobileView && <div className={styles.table_session__mobile_title}>Status</div>}
        {Object.values(EStatuses).map((status) =>
          desktopView ? <div>{status}</div> : <div>{status !== EStatuses.Total && status}</div>,
        )}
      </div>
      {filterFields(fields).map((item: IResourceListFields<EIterableFieldsKeys>) => (
        // Create a wrapper for column
        <div className={styles.table_session__column} style={{ flex: `${item.width} 1` }}>
          {mobileView && (
            <div className={styles.table_session__mobile_title}>
              <p>{item.name}</p>
              {data ? (
                <>
                  <p>{`(Total ${data[item.key].total})`}</p>
                </>
              ) : (
                <LoadingRow />
              )}
            </div>
          )}
          {data ? fillColumns(data, item) : Object.values(EStatuses).map(() => <LoadingRow />)}
        </div>
      ))}
    </div>
  );
};
