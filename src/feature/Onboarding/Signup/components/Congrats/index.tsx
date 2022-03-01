import React from 'react';

import ThinSpinner from '../../../../../shared/components/ThinSpinner';
import { useCustomWindowWidth } from '../../../../../shared/hooks/useCustomWindowWidth';

import livePersonLogoWhite from '../../../../../assets/images/signup/liveperson_logo.svg';
import styles from './congrats.module.scss';

const Congrats = (): JSX.Element => {
  const { mobileView } = useCustomWindowWidth();

  const renderFooter = (
    <footer className={`b_footer sign congrats-page__footer ${styles.pageFooter}`}>
      <div className="container">
        <div className="footer_wrapper">
          {'By '}
          <img className="hey-expert-common-img" src={livePersonLogoWhite} alt="" />
        </div>
      </div>
    </footer>
  );

  return (
    <div className={styles.congrats}>
      <div className={styles.main}>
        <div className={`b_signin_page_v2 jsHeightContent congrats-page ${styles.page}`}>
          <div className="form_block flex">
            <div className={`form_wrapper bg_form ${styles.formWrapper}`}>
              <div style={{ textAlign: 'center' }}>
                <div className="logo_wrapper">
                  <span className={styles.brendaLogo}>BRENDA</span>
                </div>
                <div className={`congrats-page__spinner-wrapper ${styles.spinnerWrapper}`}>
                  <ThinSpinner />
                </div>
                <div className={`congrats-page__message ${styles.message}`}>
                  <div className={styles.messageText}>Congrats!</div>
                  <div className={styles.messageText}>
                    We’re now building your expert profile...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {mobileView && renderFooter}
      </div>
      {!mobileView && renderFooter}
    </div>
  );
};

export default Congrats;
