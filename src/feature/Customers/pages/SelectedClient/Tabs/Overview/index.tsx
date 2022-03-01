import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppSelector, useAppDispatch } from '../../../../../../main/store/hooks';
import { selectClientInfo, selectClientSessions } from '../../../../store/selectors';
import { getClientSessionsHistory } from '../../../../store/actions';

import { SectionTitle, SessionTable, SectionLoading, PlanCard } from '../../../../components';

import styles from '../../styles.module.scss';

export const OverviewTab = (): JSX.Element => {
  const client = useAppSelector(selectClientInfo);
  const { list, pagination, loading } = useAppSelector(selectClientSessions);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getClientSessionsHistory({ id: client.id, params: { page: 1 } }));
  }, []);

  const paginationTitle =
    +pagination['x-total'] > 0 ? `(Showing ${list.length} out of ${pagination['x-total']})` : null;
  return (
    <div>
      <SectionTitle>Current products</SectionTitle>

      {client.current_plans.length > 0 ? (
        client.current_plans.map((plan) => <PlanCard plan={plan} key={uuid()} />)
      ) : (
        <p className={styles.emptyMessage}>You don&apos;t have any booked sessions yet....</p>
      )}

      <SectionTitle paddingTop>
        <div className={styles.listTitle}>
          Session history <p className={styles.listAmount}>{paginationTitle}</p>
        </div>
      </SectionTitle>

      {loading ? <SectionLoading /> : <SessionTable />}
    </div>
  );
};
