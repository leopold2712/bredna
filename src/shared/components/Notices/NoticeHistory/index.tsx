import React, { useState } from 'react';
import { Button } from '@shopify/polaris';
import { v4 as uuid } from 'uuid';
import { useAppSelector, useAppDispatch } from '../../../../main/store/hooks';
import { selectClientNotices } from '../../../../feature/OneToOneSession/store/selectors';
import { getClientNotices } from '../../../../feature/OneToOneSession/store/actions';
import type { ClientDTO } from '../../../dtos/client.dto';
import { NoticeHistoryItem } from '../NoticeHistoryItem';

import styles from '../styles.module.scss';

type Props = {
  client: ClientDTO;
};

export const NoticeHistory = ({ client }: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const notices = useAppSelector(selectClientNotices);

  const fetchNextPage = async () => {
    setLoading(true);
    const page = Number(notices.pagination['x-next-page']);
    await dispatch(getClientNotices({ id: client.id, page }));
    setLoading(false);
  };

  return (
    <>
      {notices.list.length === 0 ? (
        <p>No email history yet</p>
      ) : (
        <div className={styles.noticeContainer__subContainer}>
          {notices.list.map((notice, index) => (
            <NoticeHistoryItem notice={notice} client={client} key={uuid()} index={index} />
          ))}

          {+notices.pagination['x-total-pages'] > 1 && (
            <div className={styles.loadMore}>
              <Button plain disclosure="down" onClick={fetchNextPage} loading={loading}>
                Load more
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
