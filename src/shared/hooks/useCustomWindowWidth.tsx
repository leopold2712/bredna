import { useWindowWidth } from '@react-hook/window-size';

type ReturnType = {
  mobileView: boolean;
  tabletView: boolean;
  desktopView: boolean;
};

export const useCustomWindowWidth = (): ReturnType => {
  const width = useWindowWidth();

  return {
    mobileView: width < 768,
    desktopView: width >= 768,
    tabletView: width <= 1024,
  };
};
