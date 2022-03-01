/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Image, Loading, TopBar } from '@shopify/polaris';
import { LogOutMinor, ProfileMinor } from '@shopify/polaris-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '@react-hook/window-size';
import logo from '../../../assets/images/work-space-logo.svg';
import type { RootState } from '../../../main/store/rootReducer';
import type { AuthState } from '../../../feature/Onboarding/store';
import { logout } from '../../../feature/Onboarding/store';
import type { AppDispatch } from '../../../main/store';
import type { HeaderState } from './store';
import { NotificationsPopover } from '../Notifications';
import { setDefaultOnboarding } from '../../../feature/Home/store';
import { GAHeaderTriggers, headerAnalyticsLog } from './services/header.google-analytics';
import { localStorageKeys } from '../../constants/localStorage';

import './style.scss';

type IProps = {
  handleShowMobileNavigation: () => void;
  showAuthItems?: boolean;
};

export default function Header({
  handleShowMobileNavigation,
  showAuthItems = true,
}: IProps): JSX.Element {
  const { user } = useSelector<RootState, AuthState>((state) => state.auth);
  const { loading } = useSelector<RootState, HeaderState>((state) => state.header);

  const [isUserMenuOpen, toggleIsUserMenuOpen] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch<AppDispatch>();

  const [width] = useWindowSize();

  const desktopView = width >= 650;

  const handleLogoClick = () => {
    history.push('/home');
    headerAnalyticsLog(GAHeaderTriggers.LOGO)();
  };

  const handleLogout = () => {
    dispatch(setDefaultOnboarding());
    dispatch(logout());
    headerAnalyticsLog(GAHeaderTriggers.USER_LOG_OUT)();
    history.replace('/login');

    localStorage.removeItem(localStorageKeys.SHOW_THERAPIST_BANNER);
  };

  const personalName = `${user?.first_name} ${user?.last_name}`;
  const initials = personalName
    .split(' ')
    .map((name) => (name.length > 0 ? name[0] : ''))
    .join('');

  return (
    <div className="app__header">
      <div className="headerMenuHub">
        <button
          type="button"
          className="Polaris-TopBar__NavigationIcon"
          aria-label="Toggle menu"
          onClick={handleShowMobileNavigation}
        >
          <span className="Polaris-Icon">
            <svg
              viewBox="0 0 20 20"
              className="Polaris-Icon__Svg"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M19 11H1a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2zm0-7H1a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2zm0 14H1a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z" />
            </svg>
          </span>
        </button>

        <div style={{ display: 'flex' }}>
          {desktopView && (
            <div className="logo__wrapper" key="logoClick" onClick={handleLogoClick}>
              <Image source={logo} alt="logo" />
            </div>
          )}
        </div>
      </div>

      {showAuthItems ? (
        <div className="headerUserInfo">
          <div onClick={headerAnalyticsLog(GAHeaderTriggers.NOTIFICATION_ICON)}>
            <NotificationsPopover />
          </div>

          <div onClick={headerAnalyticsLog(GAHeaderTriggers.USER_ACCOUNT)}>
            <TopBar.UserMenu
              actions={[
                {
                  items: [
                    {
                      content: 'Contact Partner Support',
                      icon: ProfileMinor,
                      onAction: () => {
                        headerAnalyticsLog(GAHeaderTriggers.USER_PARTNER_SUPPORT)();
                        const win = window.open('https://www.brenda.app/contact', '_blank');
                        win?.focus();
                      },
                    },
                  ],
                },
                {
                  items: [
                    {
                      content: 'Logout',
                      icon: LogOutMinor,
                      onAction: handleLogout,
                    },
                  ],
                },
              ]}
              name=""
              initials={initials}
              open={isUserMenuOpen}
              onToggle={() => toggleIsUserMenuOpen(!isUserMenuOpen)}
            />
          </div>
        </div>
      ) : (
        <div className="header__hidden-items" />
      )}

      {loading && <Loading />}
    </div>
  );
}
