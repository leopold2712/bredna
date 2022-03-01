import React from 'react';
import { Link, Image } from '@shopify/polaris';

import Logo from '../../../../assets/images/home/livePerson.svg';
import styles from './footerHelp.module.scss';

export const WizardFooterHelp = () => (
  <div>
    <div className={styles.logoWrapper}>
      <span className={styles.logoText}>By</span>
      <Image source={Logo} alt="logo" />
    </div>

    <div className={styles.footerRules}>
      {'By clicking Create an account you accept '}
      <Link url="https://support.hey-expert.com/en/">Terms &amp; Conditions </Link>
    </div>
  </div>
);
