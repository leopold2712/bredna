import React, { useCallback, useEffect, useState } from 'react';
import { useWindowSize } from '@react-hook/window-size';
import { Card, Layout, Page } from '@shopify/polaris';

import Sticky from 'react-sticky-el';
import { CompleteProfile } from '../../Tabs/CompleteProfile';
import { ShareYourPage } from '../../Tabs/ShareYourPage';
import { CompleteProfessionalID } from '../../Tabs/CompleteProfessionalID';
import ProgressBarHeader from '../../components/ProgressBarHeader';
import WizardToolTip from '../../components/Tooltip';

import { TabSheets } from '../../constants/TabSheet';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import {
  clearOnboardingStepsValues,
  setAbandoneOnboarding,
  setAbandonedPage,
  setIsFirstVisit,
} from '../../store';

import { WizardFooterHelp } from '../../components/FooterHelp';
import WizardFooter from '../../components/WizardFooter';

import styles from './styles.module.scss';
import './styles.overload.scss';

const scroll = () => {
  window.scrollTo(0, 0);
};

const OnboardingWizard: React.FC = () => {
  const [progress, setProgress] = useState(5);
  const dispatch = useAppDispatch();
  const { activePage, abandonedPage, abandoneOnboarding, isFirstVisit } = useAppSelector(
    (state) => state.home,
  );

  const [width] = useWindowSize();

  useEffect(() => {
    switch (activePage) {
      case TabSheets.completeProfile: {
        setProgress(25);
        break;
      }
      case TabSheets.completeProfessionalID: {
        setProgress(65);
        break;
      }
      case TabSheets.shareYourPage: {
        setProgress(100);
        break;
      }
      default:
        break;
    }

    scroll();
  }, [activePage]);

  useEffect(
    () => () => {
      dispatch(setAbandonedPage(activePage));
      dispatch(clearOnboardingStepsValues());
    },
    [],
  );

  useEffect(() => {
    const step = localStorage.getItem('onboarding-step');
    if (step === '3') {
      localStorage.setItem('isFirstVisit', 'false');
      dispatch(setIsFirstVisit(false));
      dispatch(setAbandoneOnboarding(false));
    }
  }, []);

  const renderSelectedTab = useCallback(() => {
    const page = isFirstVisit && abandoneOnboarding ? abandonedPage : activePage;

    if (isFirstVisit && abandoneOnboarding) {
      dispatch(setAbandoneOnboarding(false));
    }
    switch (page) {
      case TabSheets.completeProfile:
        return <CompleteProfile />;
      case TabSheets.completeProfessionalID:
        return <CompleteProfessionalID />;
      case TabSheets.shareYourPage:
        return <ShareYourPage />;
      default:
        return <div />;
    }
  }, [activePage]);

  return (
    <div className="wizard-page-overload">
      <Page>
        <Layout>
          <Layout.Section>
            <div className={styles.wizardWrapper}>
              <Card>
                {width < 1050 ? (
                  <div>
                    <div className={styles.wizardTooltipMobile}>
                      <div className={styles.wizardTooltipMobile__cnt}>
                        <WizardToolTip mobile />
                      </div>
                    </div>
                    <ProgressBarHeader
                      progress={progress}
                      activeStep={activePage}
                      titles={['Complete profile', 'Complete professional ID', 'Share your page']}
                    />
                  </div>
                ) : (
                  <Sticky stickyClassName={styles.stickyHeader}>
                    <ProgressBarHeader
                      progress={progress}
                      activeStep={activePage}
                      titles={['Complete profile', 'Complete professional ID', 'Share your page']}
                    />
                  </Sticky>
                )}

                {renderSelectedTab()}

                {activePage !== TabSheets.shareYourPage && (
                  <Sticky mode="bottom" stickyClassName={styles.sticky}>
                    <WizardFooter activeScreen={activePage} />
                  </Sticky>
                )}

                {activePage !== TabSheets.shareYourPage && width >= 1050 && <WizardFooterHelp />}
              </Card>
            </div>
          </Layout.Section>
          {width >= 1050 && (
            <Layout.Section secondary>
              <div className={styles.tooltipWrapper}>
                <WizardToolTip />
              </div>
            </Layout.Section>
          )}
        </Layout>
      </Page>
    </div>
  );
};

export default OnboardingWizard;
