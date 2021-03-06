import React, { useCallback, useState } from 'react';
import { Icon, TextField, ActionList, Popover } from '@shopify/polaris';
import { SearchMinor, FilterMajor } from '@shopify/polaris-icons';

import './header.overload.scss';

export const ConversationsListHeader = (): JSX.Element => {
  // const rooms = useAppSelector(selectChatRooms);
  const [isPopoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(() => {
    setPopoverActive((isPopoverActive) => !isPopoverActive);
  }, []);

  const activator = (
    <button className="activator" type="button" onClick={togglePopoverActive}>
      <Icon source={FilterMajor} />
    </button>
  );

  const [inputValue, setInputValue] = useState('');

  const updateText = useCallback((value) => {
    setInputValue(value);
  }, []);

  return (
    <div className="listSearch__wrapper">
      <div className="listSearch__search">
        <TextField
          label="searchbar"
          type="search"
          labelHidden
          value={inputValue}
          onChange={updateText}
          placeholder="Search by name"
          prefix={<Icon source={SearchMinor} color="base" />}
        />
      </div>
      <div className="listSearch__burger">
        <Popover
          activator={activator}
          active={isPopoverActive}
          onClose={togglePopoverActive}
          preferredAlignment="left"
        >
          <div className="sortList">
            <ActionList
              actionRole="menuitem"
              items={[
                { content: 'All' },
                { content: 'Active plan' },
                { content: 'Active plan paid' },
                { content: 'Expired plan' },
              ]}
            />
          </div>
        </Popover>
      </div>
    </div>
  );
};
