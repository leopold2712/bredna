import React, { useEffect } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import { useHistory, useLocation } from 'react-router-dom';
import { Conversations } from '..';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import { setMenuItem } from '../../../../shared/components/SideMenu';
import { MenuPages } from '../../../../shared/components/SideMenu/models/SideMenuState';
import { ChatService } from '../../services';
import { clearChatData, setActiveClientID, setActiveRoom, setChatUI } from '../../store';
import { getChatToken } from '../../store/actions';
import { selectActiveRoom, selectChatRooms, selectChatUI } from '../../store/selectors';

export const ConversationsMain = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const chatUI = useAppSelector(selectChatUI);
  const activeRoom = useAppSelector(selectActiveRoom);
  const rooms = useAppSelector(selectChatRooms);

  const history = useHistory();
  const location = useLocation<{ clientID: string }>();

  const initChat = async () => {
    if (location.state && location.state.clientID) {
      dispatch(setActiveClientID(location.state.clientID));
      history.replace({ state: {} });
    }

    const { payload } = await dispatch(getChatToken());
    if (typeof payload === 'string') {
      ChatService.init(payload);
    }
  };

  const [width] = useWindowSize();
  const mobileView = width < 700;

  useEffect(() => {
    dispatch(setChatUI({ ...chatUI, mobileView }));
    if (!mobileView && !activeRoom) {
      dispatch(setActiveRoom(rooms.all[0]));
    }
  }, [mobileView]);

  useEffect(() => {
    initChat();
    dispatch(setMenuItem(MenuPages.Chat));
    return () => {
      dispatch(clearChatData());
      ChatService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (location.state) {
      dispatch(clearChatData());
      ChatService.disconnect();
      initChat();
    }
  }, [location.state]);

  return <Conversations />;
};
