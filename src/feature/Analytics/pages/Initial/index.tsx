import React from 'react';
import { Card, EmptyState, FooterHelp, Link, Page } from '@shopify/polaris';
import AnalyticsIcon from '../../../../assets/images/analytics/icon.png';
import './analytics.scss';

const Analytics: React.FC = () => (
  <Page title="Analytics" fullWidth>
    <Card>
      <EmptyState image={AnalyticsIcon} fullWidth>
        <div className="empty-analytics__wrapper">
          <p className="empty-analytics__title">
            Our “Analytics” page would be visible for you after your first purchase
          </p>
          {/* <p className="empty-analytics__subtitle">Coming soon</p> */}
        </div>
      </EmptyState>
    </Card>
    <div className="no-print">
      <FooterHelp>
        {'Learn more about '}
        <Link url="https://support.hey-expert.com/en/">Analytics</Link>
      </FooterHelp>
    </div>
  </Page>
);

export default Analytics;
