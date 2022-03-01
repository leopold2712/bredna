import React, { ReactNode, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Icon, Layout, Page, Stack, TextStyle } from '@shopify/polaris';
import {
  ImagesMajor,
  LegalMajor,
  NotificationMajor,
  PaymentsMajor,
  ProfileMajor,
  SettingsMajor,
} from '@shopify/polaris-icons';
import { settingsPageLogger } from '../../../Home/utils/analyticsService';
import { SettingsPageEvents } from '../../../Home/constants/EventsTriggers';
import { useAppDispatch } from '../../../../main/store/hooks';
import { setMenuItem } from '../../../../shared/components/SideMenu';
import { MenuPages } from '../../../../shared/components/SideMenu/models/SideMenuState';

import './settingsMenu.overload.scss';
import styles from './settingsMenu.module.scss';

type SettingProp = {
  type: string;
};

const SettingIcon: React.FC<SettingProp> = ({ type }: SettingProp): JSX.Element => {
  const getIconSource = (): React.SFC<React.SVGProps<SVGSVGElement>> => {
    switch (type) {
      case 'My profile':
        return ProfileMajor;
      case 'Legal':
        return LegalMajor;
      case 'Media library':
        return ImagesMajor;
      case 'Notifications':
        return NotificationMajor;
      case 'Payments':
        return PaymentsMajor;
      default:
        return SettingsMajor;
    }
  };
  return (
    <div className={styles.icon}>
      <div className="settings-overload__icon">
        <Icon source={getIconSource()} />
      </div>
    </div>
  );
};

const Content = ({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: ReactNode;
}) => (
  <div className={styles.content}>
    <Stack>
      <SettingIcon type={title} />
      <div className="settings-overload__button">
        <Button plain size="large" onClick={() => onClick()}>
          {title}
        </Button>
        <div className={styles.contentText}>
          <div className="settings-overload__text">
            <TextStyle variation="subdued">{children}</TextStyle>
          </div>
        </div>
      </div>
    </Stack>
  </div>
);

const SettingsMenu: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { pathname } = history.location;

  const contentClickHandler = (path: string, action: SettingsPageEvents) => () => {
    settingsPageLogger(action);
    history.push(path);
  };

  useEffect(() => {
    dispatch(setMenuItem(MenuPages.Settings));
  }, []);

  return (
    <Page title="Settings">
      <div className={styles.wrapper}>
        <Card>
          <Layout>
            <Layout.Section oneHalf>
              <Content
                title="Legal"
                onClick={contentClickHandler(`${pathname}/legal`, SettingsPageEvents.LEGAL)}
              >
                Manage your stores legal pages
              </Content>

              <Content
                title="Notifications"
                onClick={() => history.push(`${pathname}/notifications`)}
              >
                Manage notifications sent for you and your customers
              </Content>
            </Layout.Section>

            <Layout.Section oneHalf>
              <Content
                title="Payments"
                onClick={contentClickHandler(`${pathname}/payments`, SettingsPageEvents.PAYMENTS)}
              >
                View and update your stores details
              </Content>
            </Layout.Section>
          </Layout>
        </Card>
      </div>
    </Page>
  );
};

export default SettingsMenu;
