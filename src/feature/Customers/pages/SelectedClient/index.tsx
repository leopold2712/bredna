import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Card, Icon, Layout, Page, Sheet, Tabs } from '@shopify/polaris';
import { MobileVerticalDotsMajor } from '@shopify/polaris-icons';

import { useWindowSize } from '@react-hook/window-size';
import { useAppSelector } from '../../../../main/store/hooks';
import { selectClientInfo } from '../../store/selectors';
import { singleClientTabs } from '../../constants';

import { JourneyTab, OverviewTab, EmailTab } from './Tabs';
import { SingleClientDrawer } from '../../components';

import styles from './styles.module.scss';
import { useCustomWindowWidth } from '../../../../shared/hooks/useCustomWindowWidth';

const getSelectedTab = (index: number) => {
  switch (index) {
    case 0:
      return <OverviewTab />;
    case 1:
      return <JourneyTab />;
    case 2:
      return <EmailTab />;
    default:
      return <></>;
  }
};

const SelectedClient: React.FC = (): JSX.Element => {
  const { tabletView } = useCustomWindowWidth();

  const [selected, setSelected] = useState(0);
  const [singleClientIdSheetOpen, setSingleClientIdSheetOpen] = useState(false);

  const client = useAppSelector(selectClientInfo);

  const toggleSingleClientIdSheetOpen = () => {
    setSingleClientIdSheetOpen(!singleClientIdSheetOpen);
  };

  const handleTabChange = useCallback((index) => {
    setSelected(index);
  }, []);

  return (
    <Page
      titleMetadata={<h1 className={classNames(styles.header, 'fs-mask')}>{client.name}</h1>}
      primaryAction={
        tabletView ? (
          <button type="button" onClick={toggleSingleClientIdSheetOpen} className={styles.button}>
            <Icon source={MobileVerticalDotsMajor} />
          </button>
        ) : null
      }
      breadcrumbs={[{ content: 'All clients', url: `/clients` }]}
    >
      <Layout>
        <Layout.Section>
          <Tabs tabs={singleClientTabs} selected={selected} onSelect={handleTabChange}>
            <Card sectioned>{getSelectedTab(selected)}</Card>
          </Tabs>
        </Layout.Section>

        {tabletView ? (
          <Sheet
            open={singleClientIdSheetOpen}
            onClose={toggleSingleClientIdSheetOpen}
            accessibilityLabel="availability"
          >
            <SingleClientDrawer client={client} closeSheet={toggleSingleClientIdSheetOpen} />
          </Sheet>
        ) : (
          <Layout.Section secondary>
            <div className={styles.clientID}>
              <SingleClientDrawer client={client} />
            </div>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
};

export default SelectedClient;
