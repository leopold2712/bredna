import React, { useState } from 'react';
import { Popover, Icon } from '@shopify/polaris';
import { SortMinor } from '@shopify/polaris-icons';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import { setRooms } from '../../store';
import { selectChatRooms } from '../../store/selectors';

import './header.overload.scss';

export const ConversationsListHeader = (): JSX.Element => {
  const rooms = useAppSelector(selectChatRooms);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const dispatch = useAppDispatch();

  const closePopover = () => setPopoverOpen(false);
  const openPopover = () => setPopoverOpen(true);

  const sortByClientName = () => {
    // dispatch(
    //   setRooms({
    //     all: sortRoomsByClientName(rooms.all),
    //     filtered: sortRoomsByClientName(rooms.filtered),
    //   }),
    // );
    setPopoverOpen(false);
  };

  return (
    <div className="listSearch__wrapper">
      <Popover
        activator={
          <button type="button" className="listSearch__sort" onClick={openPopover}>
            <Icon source={SortMinor} />
          </button>
        }
        active={popoverOpen}
        onClose={closePopover}
        preferredAlignment="right"
      >
        <div className="list-actions__wrapper">
          {/* <button type="button" className="" onClick={sortByHubName}>
            Urgent flag
          </button> */}

          <button type="button" className="" onClick={sortByClientName}>
            Most recent date
          </button>
        </div>
      </Popover>
    </div>
  );
};
