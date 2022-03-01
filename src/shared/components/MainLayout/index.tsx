import React, { ReactNode, useState } from 'react';
import { Frame } from '@shopify/polaris';
import Header from '../Header';
import SideMenu from '../SideMenu';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  const [showMobileNavigation, setShowMobileNavigation] = useState(false);
  const handleShowMobileNavigation = () => setShowMobileNavigation((prev) => !prev);
  const hideMobileNavigation = () => setShowMobileNavigation(false);

  return (
    <Frame
      topBar={<Header handleShowMobileNavigation={handleShowMobileNavigation} />}
      navigation={<SideMenu handleShowMobileNavigation={hideMobileNavigation} />}
      showMobileNavigation={showMobileNavigation}
      onNavigationDismiss={handleShowMobileNavigation}
    >
      {children}
    </Frame>
  );
}
