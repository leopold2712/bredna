import React, { useState } from 'react';
import { Button } from '@shopify/polaris';
import moment from 'moment';
import classNames from 'classnames';
import { useAppDispatch } from '../../../../main/store';
import type { ClientDTO, NoticeDTO } from '../../../dtos';
import { getClientNotices, sendMessage } from '../../../../feature/OneToOneSession/store/actions';

import { Attachment } from '../Attachment';

import styles from './styles.module.scss';

type Props = {
  notice: NoticeDTO;
  client: ClientDTO;
  index: number;
};

export const NoticeHistoryItem = ({
  notice: { id, subject, body, attachments, created_at },
  client,
  index,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleResendClick = async () => {
    setLoading(true);

    const mappedAttachments = attachments.map((a) => {
      const index = a.url.lastIndexOf('/') + 1;
      return a.url.slice(index);
    });

    await dispatch(
      sendMessage({
        subject,
        body,
        client_ids: [client.id],
        ...(attachments.length && { attachments: mappedAttachments }),
      }),
    );

    await dispatch(getClientNotices({ id: client.id, page: 1 }));

    setLoading(false);
  };

  return (
    <>
      {index !== 0 && <div className={styles.divider} />}

      <div className={classNames(styles.wrapper, 'fs-mask')} key={id}>
        <h1>{subject}</h1>
        <p>{body}</p>

        <div className={styles.attachments}>
          {attachments.map((a) => (
            <Attachment name={a.name} />
          ))}
        </div>

        <div className={classNames(styles.date, 'fs-unmask')}>
          <p>
            {`Sent ${moment(created_at).format('DD/MM/YY')} at ${moment(created_at).format(
              'hh:mmA',
            )}`}
          </p>
        </div>

        <div className={classNames(styles.button, 'fs-unmask')}>
          <Button plain monochrome onClick={handleResendClick} loading={loading}>
            Resend
          </Button>
        </div>
      </div>
    </>
  );
};
