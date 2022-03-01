import React from 'react';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from '../../../../main/store/hooks';
import { selectClientSessions, selectClientInfo } from '../../store/selectors';
import { getClientSessionsHistory } from '../../store/actions';

import ListPagination from '../../../../shared/components/Pagination';

import styles from './styles.module.scss';

export const SessionTable = (): JSX.Element => {
  const client = useAppSelector(selectClientInfo);
  const { list, pagination } = useAppSelector(selectClientSessions);

  const dispatch = useAppDispatch();

  const handleNextPage = () => {
    if (pagination['x-next-page'])
      dispatch(
        getClientSessionsHistory({ id: client.id, params: { page: +pagination['x-next-page'] } }),
      );
  };

  const handlePrevPage = () => {
    if (pagination['x-prev-page'])
      dispatch(
        getClientSessionsHistory({ id: client.id, params: { page: +pagination['x-prev-page'] } }),
      );
  };

  return list.length > 0 ? (
    <div className={styles.table}>
      <div className={styles.header}>
        <span className={styles.date}>Session date</span>
        <span className={styles.show}>Show/No show</span>
      </div>
      <ul className={styles.rows}>
        {list.map((session) => (
          <li className={styles.row}>
            <span className={styles.date}>{moment(session.start_time).format('MMM DD, YYYY')}</span>
            <span className={styles.show}>{session.did_attend ? 'Show' : 'No show'}</span>
          </li>
        ))}
      </ul>

      {+pagination['x-total-pages'] > 1 && (
        <div className={styles.pagination}>
          <ListPagination
            pagination={pagination}
            onNext={handleNextPage}
            onPrevious={handlePrevPage}
          />
        </div>
      )}
    </div>
  ) : (
    <p className={styles.emptyMessage}>You don&apos;t have sessions history yet....</p>
  );
};
