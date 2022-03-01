import React from 'react';
import { useAppDispatch } from '../../../../main/store/hooks';
import ControlButtons from '../ControlButtons';
import { TabSheets } from '../../constants/TabSheet';
import {
  setActivePage,
  toggleBackIndicator,
  toggleSaveIndicator,
  toggleSkipIndicator,
} from '../../store';
import { saveLogger, skipLogger } from '../../utils/analyticsService';

import styles from './wizardFooter.module.scss';
import './wizardFooter.overload.scss';

type Props = {
  activeScreen: TabSheets;
};

const WizardFooter: React.FC<Props> = ({ activeScreen }: Props) => {
  const dispatch = useAppDispatch();

  const backHandler = () => {
    dispatch(toggleBackIndicator(true));
    dispatch(setActivePage(TabSheets.completeProfile));
  };

  const saveHandler = () => {
    saveLogger(activeScreen);
    dispatch(toggleSaveIndicator(true));
  };

  const skipHandler = () => {
    skipLogger(activeScreen);
    dispatch(toggleSkipIndicator(true));
    dispatch(toggleBackIndicator(false));
  };

  return (
    <div className={styles.footer}>
      {activeScreen !== TabSheets.shareYourPage && (
        <ControlButtons
          handleBack={backHandler}
          handleSaveAndContinue={saveHandler}
          handleSkip={skipHandler}
          activePage={activeScreen}
        />
      )}
    </div>
  );
};

export default WizardFooter;
