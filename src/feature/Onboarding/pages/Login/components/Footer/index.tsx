import { Link } from '@shopify/polaris';
import React from 'react';
import { GALoginTriggers, loginAnalyticsLog } from '../../../../services/login.analytics';

import styles from './styles.module.scss';

export const LoginFooter = (): JSX.Element => (
  <div className={styles.footer}>
    <div className={styles.customLinkWrap}>
      <span className={styles.account}>Do not have an account? </span>
      <Link removeUnderline url="/signup" onClick={loginAnalyticsLog(GALoginTriggers.LOGIN_SIGNUP)}>
        Sign Up
      </Link>
    </div>
  </div>
);
