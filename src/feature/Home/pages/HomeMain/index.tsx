import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import WelcomeHome from '../Welcome';
import OnboardingWizard from '../Wizard';
import { setMenuItem } from '../../../../shared/components/SideMenu';
import { MenuPages } from '../../../../shared/components/SideMenu/models/SideMenuState';
import { setIsFirstVisit } from '../../store';

import './wizard.scss';

interface HomeProps {
  showWizard?: boolean; // temporary solution in purpose of showing HomePage and Wizzard components separately
}
export default function Home({ showWizard }: HomeProps): JSX.Element {
  const dispatch = useAppDispatch();

  const { isFirstVisit } = useAppSelector((state) => state.home);

  const checkFirstVisit = (): boolean => {
    const firstVisit = localStorage.getItem('isFirstVisit');
    const result = firstVisit === null || firstVisit === 'true';
    if (result) {
      dispatch(setIsFirstVisit(true));
      localStorage.setItem('isFirstVisit', 'false');
    }
    return result;
  };

  useEffect(() => {
    checkFirstVisit();
  }, []);

  useEffect(() => {
    dispatch(setMenuItem(MenuPages.Home));
  }, []);

  if (showWizard || isFirstVisit) return <OnboardingWizard />;

  return <WelcomeHome />;
}
