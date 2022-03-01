import React, { useEffect, useState } from 'react';
import { Icon } from '@shopify/polaris';
import {
  BillingStatementDollarMajor,
  ChatMajor,
  CustomersMajor,
  HomeMajor,
  LiveViewMajor,
  ProfileMajor,
  SettingsMajor,
} from '@shopify/polaris-icons';
import { useHistory, useLocation } from 'react-router-dom';

import Navigation from '../Navigation';
import { useAppDispatch } from '../../../main/store/hooks';
import {
  MenuActivePage,
  MenuActiveTab,
  MenuActiveSection,
  MenuPages,
  MenuSections,
  MenuTabs,
} from './models/SideMenuState';
import { setMenuActivePage, setMenuActiveTab, setMenuActiveSection } from './store';
import { GASidemenuTriggers, sidemenuAnalyticsLog } from './services/sidemenu.google-analytics';

import styles from './sideMenu.module.scss';

interface ISideMenuProps {
  handleShowMobileNavigation: () => void;
}

export enum DropDownMenus {
  Products = 'Products',
  Offerings = 'Offerings',
  Analytics = 'Analytics',
  Pricing = 'Pricing',
  Hubs = 'Hubs',
  Marketing = 'Marketing',
}

export const setMenuItem = (page: MenuActivePage, hub = 0) => setMenuActivePage({ hub, page });

export const setMenuItemTab = (tab: MenuActiveTab, hub = 0) => setMenuActiveTab({ hub, tab });

export const setMenuItemSection = (page: MenuActivePage, section: MenuActiveSection, hub = 0) =>
  setMenuActiveSection({ hub, page, section });

export default function SideMenu({ handleShowMobileNavigation }: ISideMenuProps): JSX.Element {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const [mainMenuActiveItem, setMainMenuActiveItem] = useState('');

  const onClick = () => handleShowMobileNavigation();

  const resetMenuStates = () => {
    dispatch(setMenuActivePage({ hub: 0, page: MenuPages.None }));
    dispatch(setMenuActiveTab({ hub: 0, tab: MenuTabs.None }));
    dispatch(setMenuActiveSection({ hub: 0, page: MenuPages.None, section: MenuSections.None }));
  };

  useEffect(() => {
    if (pathname && pathname !== mainMenuActiveItem) {
      if (/\d$/.test(pathname)) {
        const menuItem = pathname.slice(0, pathname.lastIndexOf('/'));
        setMainMenuActiveItem(menuItem);
      } else {
        setMainMenuActiveItem(pathname);
      }
    }
  }, [pathname]);

  return (
    <div className={styles.sideMenu}>
      <div style={{ flex: 1 }}>
        <Navigation
          activeItemId={mainMenuActiveItem}
          onSelect={({ itemId }) => {
            resetMenuStates();
            if (
              itemId &&
              ![
                DropDownMenus.Products.toString(),
                DropDownMenus.Offerings.toString(),
                DropDownMenus.Analytics.toString(),
                DropDownMenus.Hubs.toString(),
                DropDownMenus.Marketing.toString(),
              ].includes(itemId)
            ) {
              history.push(itemId);
              setMainMenuActiveItem(itemId);
              onClick();
            }
          }}
          items={[
            {
              title: 'Home',
              itemId: MenuPages.Home,
              elemBefore: () => <Icon source={HomeMajor} />,
              gaEvent: sidemenuAnalyticsLog(GASidemenuTriggers.MENU_HOME),
            },
            {
              title: 'Clients',
              itemId: MenuPages.Clients,
              elemBefore: () => <Icon source={CustomersMajor} />,
              gaEvent: sidemenuAnalyticsLog(GASidemenuTriggers.MENU_CLIENTS),
              notifications: 0,
            },
            {
              title: 'Messaging',
              itemId: MenuPages.Chat,
              elemBefore: () => <Icon source={ChatMajor} />,
              gaEvent: sidemenuAnalyticsLog(GASidemenuTriggers.MENU_MESSAGING),
              notifications: 0,
            },
            {
              title: 'Live session',
              itemId: MenuPages.LiveSession,
              elemBefore: () => <Icon source={LiveViewMajor} />,
              gaEvent: sidemenuAnalyticsLog(GASidemenuTriggers.MENU_LIVE_SESSION),
            },
            {
              title: 'My professional profile',
              itemId: MenuPages.MyProfile,
              elemBefore: () => <Icon source={ProfileMajor} />,
              gaEvent: sidemenuAnalyticsLog(GASidemenuTriggers.MENU_MY_PROFILE),
            },
            {
              title: 'Earning',
              itemId: MenuPages.Earning,
              elemBefore: () => <Icon source={BillingStatementDollarMajor} />,
              gaEvent: sidemenuAnalyticsLog(GASidemenuTriggers.MENU_EARNING),
            },
          ]}
        />
      </div>

      <Navigation
        activeItemId={mainMenuActiveItem}
        onSelect={({ itemId }) => {
          resetMenuStates();
          if (itemId) {
            history.push(itemId);
            setMainMenuActiveItem(itemId);
            onClick();
          }
        }}
        items={[
          {
            title: 'Settings',
            itemId: MenuPages.Settings,
            elemBefore: () => <Icon source={SettingsMajor} />,
            gaEvent: sidemenuAnalyticsLog(GASidemenuTriggers.MENU_SETTINGS),
          },
        ]}
        listOfSamePages={[
          MenuPages.SettingsLegal,
          MenuPages.SettingsNotifications,
          MenuPages.SettingsPayments,
          MenuPages.Terms,
          MenuPages.Privacy,
        ]}
      />
    </div>
  );
}
