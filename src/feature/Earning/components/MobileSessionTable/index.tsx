import React, { FC, useCallback, useState } from 'react';
import { Image, OptionList, Popover } from '@shopify/polaris';
import moment from 'moment';

import { sessionDetailsFields } from '../../constants';

import type { SessionDTO } from '../../../../shared/dtos/session.dto';

import sortImg from '../../../../assets/images/sort.svg';
import styles from './styles.module.scss';

type TProps = {
  list: SessionDTO[];
};

export const MobileSessionTable: FC<TProps> = ({ list }: TProps) => {
  const [isSortingPopover, setIsSortingPopover] = useState(false);
  const [sorts, setSorts] = useState<string[]>([]);

  const togglePopoverActive = () => setIsSortingPopover((popoverActive) => !popoverActive);

  const compareFieldsAndData = useCallback(
    (sessionsList: SessionDTO[]) => {
      const newSessionsList = sessionsList.map((item: SessionDTO) => ({
        client_name: item.participants[0].client.name,
        date: moment(item.start_time).format('MMM DD, YYYY'),
      }));

      return newSessionsList.map((item) => (
        <div className={styles.mobile_table__card}>
          {sessionDetailsFields.map((field) =>
            Object.entries(item).map(([key, value]) =>
              key === field.key ? (
                <div className={styles.mobile_table__container}>
                  <div className={styles.mobile_table__title}>{field.name}</div>
                  <div className={styles.mobile_table__value}>{value}</div>
                </div>
              ) : undefined,
            ),
          )}
        </div>
      ));
    },
    [list],
  );

  return (
    <div className={styles.mobile_sessions_table}>
      <div className={styles.mobile_header}>
        <Popover
          active={isSortingPopover}
          activator={
            <div className={styles.mobile_header__sort}>
              <Image onClick={togglePopoverActive} source={sortImg} alt="sort image" />
            </div>
          }
          autofocusTarget="first-node"
          onClose={togglePopoverActive}
        >
          <OptionList
            onChange={setSorts}
            options={[
              { value: 'show', label: 'Show' },
              { value: 'type', label: 'Type' },
            ]}
            selected={sorts}
          />
        </Popover>
      </div>
      <div className={styles.mobile_table}>{compareFieldsAndData(list)}</div>
    </div>
  );
};
