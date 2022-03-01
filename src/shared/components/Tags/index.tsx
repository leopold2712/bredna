import React, { useState } from 'react';
import { Button, Stack, Tag, TextField } from '@shopify/polaris';
import { v4 as uuidv4 } from 'uuid';

import styles from './styles.module.scss';

type Props = {
  tags: { id?: number; name: string }[];
  tagsLoading: boolean;
  addTag: (arg: string) => void;
  deleteTag: (arg: string) => void;
};

export const Tags = ({ tags, tagsLoading, addTag, deleteTag }: Props): JSX.Element => {
  const [tagInputValue, setTagInputValue] = useState('');

  const handleAddTag = () => {
    addTag(tagInputValue);
    setTagInputValue('');
  };
  return (
    <div className={styles.tags}>
      <p className={styles.tags__title}>Tags</p>
      <TextField
        label=""
        labelHidden
        autoComplete={false}
        onChange={setTagInputValue}
        value={tagInputValue}
        connectedRight={
          <Button
            disabled={tagInputValue.length === 0}
            onClick={handleAddTag}
            loading={tagsLoading}
          >
            Add
          </Button>
        }
      />
      {tags.length > 0 && (
        <div className={styles.tags__wrapper}>
          <Stack>
            {tags?.map((tag) => (
              <Tag onRemove={() => deleteTag(tag.name)} key={uuidv4()}>
                {tag.name}
              </Tag>
            ))}
          </Stack>
        </div>
      )}
    </div>
  );
};
