import React, { useState, useEffect } from 'react';
import { Button } from '@shopify/polaris';
import { MobileCancelMajor } from '@shopify/polaris-icons';
import classNames from 'classnames';

import { useParams } from 'react-router';
import { useWindowSize } from '@react-hook/window-size';
import { useAppDispatch } from '../../../../main/store/hooks';

import { addNewTag } from '../../store/actions/addNewTag';
import { getClientAsync } from '../../store/actions';
import { removeTag } from '../../store/actions/removeTag';

import type { ClientDTO } from '../../../../shared/dtos/client.dto';

import HeyToast from '../../../../shared/components/HeyToast';
import { Tags } from '../../../../shared/components/Tags';
import { ClientIDCard } from '../ClientIDCard';

import defaultAvatar from '../../../../assets/images/clients/avatar-default.png';

import styles from './styles.module.scss';
import { useCustomWindowWidth } from '../../../../shared/hooks/useCustomWindowWidth';

type Props = {
  client: ClientDTO;
  closeSheet?: () => void;
};

export const SingleClientDrawer: React.FC<Props> = ({ client, closeSheet }: Props) => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { tabletView } = useCustomWindowWidth();

  const [tags, setTags] = useState<{ id?: number; name: string }[]>([]);
  const [tagsLoading, setTagsLoading] = useState(false);

  useEffect(() => {
    setTags(client.tags);
  }, [client]);

  const addTag = async (value: string) => {
    setTagsLoading(true);

    if (tags.some((t) => t.name === value.trim())) {
      HeyToast.show({ text: 'This tag already exists', isError: true });
    } else {
      try {
        await dispatch(addNewTag({ clientId: id, tag: value.trim() }));
        await dispatch(getClientAsync({ id: +id }));
      } catch (err) {
        HeyToast.show({ text: 'An error occured while adding tag', isError: true });
      }
    }

    setTagsLoading(false);
  };

  const deleteTag = async (tag: string) => {
    setTags((prev) => prev.filter((t) => t.name !== tag));
    try {
      await dispatch(removeTag({ clientId: id, tag }));
      await dispatch(getClientAsync({ id: +id }));
    } catch (err) {
      HeyToast.show({ text: 'An error occured while deleting tag', isError: true });
    }
  };

  const wrapperClassNames = classNames(styles.wrapper, { [styles.wrapperMobile]: tabletView });

  return (
    <div className={wrapperClassNames}>
      {tabletView && (
        <div className={styles.closeButton}>
          <Button accessibilityLabel="Cancel" icon={MobileCancelMajor} onClick={closeSheet} plain />
        </div>
      )}

      <ClientIDCard mobileView={tabletView}>
        <div className={styles.cardHeader}>
          <h1>Client ID</h1>
          {/* <Button plain removeUnderline>
            Message
          </Button> */}
        </div>
        <div className={styles.cardBody}>
          <img
            src={client.thumbnail || defaultAvatar}
            className={classNames(styles.avatar, 'fs-exclude')}
            alt="user avatar"
          />
          <p className={classNames(styles.clientName, 'fs-mask')}>{client.name}</p>
        </div>
      </ClientIDCard>

      <ClientIDCard mobileView={tabletView}>
        <Tags tags={tags} tagsLoading={tagsLoading} addTag={addTag} deleteTag={deleteTag} />
      </ClientIDCard>

      {/* <ClientIDCard mobileView={mobileView}>
        <Button fullWidth>Report client</Button>
      </ClientIDCard> */}
    </div>
  );
};
