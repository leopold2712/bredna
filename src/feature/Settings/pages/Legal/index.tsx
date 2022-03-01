import React, { useEffect } from 'react';
import { Card, Layout, Link, Page } from '@shopify/polaris';
import { useAppDispatch } from '../../../../main/store/hooks';
import { setMenuItem } from '../../../../shared/components/SideMenu';
import { MenuPages } from '../../../../shared/components/SideMenu/models/SideMenuState';

import styles from './styles.module.scss';

export const LegalSettings = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMenuItem(MenuPages.Settings));
  }, []);

  return (
    <Page title="Legal" breadcrumbs={[{ content: 'Settings', url: `/settings` }]}>
      <Layout>
        <Layout.Section oneHalf>
          <Card title="Privacy Policy">
            <Card.Section>
              <div className={styles.legalItem}>
                <p>Last Updated on November 10, 2021</p>
                <Link url="/privacy">See page</Link>
              </div>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card title="Terms of Use">
            <Card.Section>
              <div className={styles.legalItem}>
                <p>Last updated on November 22, 2021</p>
                <Link url="/terms-of-use">See page</Link>
              </div>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
