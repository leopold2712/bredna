import React, { useState, useCallback } from 'react';
import { TextField, Icon } from '@shopify/polaris';
import { SearchMinor } from '@shopify/polaris-icons';

import styles from './search.module.scss';

export const CollapsibleSearch: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const checkAndClose = () => {
    if (searchValue.length === 0) toggleOpen();
  };

  return open ? (
    <div className={styles.search}>
      <TextField
        value={searchValue}
        label="Search in chat"
        placeholder="Search in chat..."
        labelHidden
        onChange={setSearchValue}
        prefix={<Icon source={SearchMinor} />}
        onBlur={checkAndClose}
        focused
      />
    </div>
  ) : (
    <div className={styles.searchClosed}>
      <button className={styles.searchButton} type="button" onClick={toggleOpen}>
        <Icon source={SearchMinor} color="subdued" />
      </button>
    </div>
  );
};
