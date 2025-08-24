import { useWindowDimensions } from 'react-native';

const MOBILE_BREAKPOINT = 768;

export const useResponsive = () => {
  const { width } = useWindowDimensions();

  return {
    isMobile: width < MOBILE_BREAKPOINT,
  };
};