import React, { FC, useState } from 'react';
import { Page, Tabs } from '@shopify/polaris';
import { Link } from 'react-router-dom';

import { tabs } from '../constants';
import { Total } from './Tabs/Total';
import { Sessions } from './Tabs/Sessions';
import { Pricing } from './Tabs/Pricing';
import { Messaging } from './Tabs/Messaging';

import styles from './styles.module.scss';
import './styles.overload.scss';

const getSelectedTab = (index: number) => {
  switch (index) {
    case 0:
      return <Total />;
    case 1:
      return <Sessions />;
    case 2:
      return <Messaging />;
    case 3:
      return <Pricing />;
    default:
      return <></>;
  }
};

export const EarningPage: FC = (): JSX.Element => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = (index: number) => {
    setSelected(index);
  };

  return (
    <div className="earning-page">
      <Page
        title="Earning"
        subtitle="The money you make with brenda depends on your availabliity and interactions with clients."
      >
        <div className={styles.tabs_wrapper}>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            <div className={styles.tab_wrapper}>{getSelectedTab(selected)}</div>
          </Tabs>
        </div>
        {selected !== 0 && (
          <p className={styles.footer}>
            <span>For any further questions please write us </span>
            <Link to="/">here</Link>
          </p>
        )}
      </Page>
    </div>
  );
};
