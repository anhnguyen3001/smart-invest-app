import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MOBILE_WIDTH, TABLET_WIDTH } from 'src/constants';

export const useWindowResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isTabletView: width <= TABLET_WIDTH,
    isMobileView: width <= MOBILE_WIDTH,
  };
};

export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};
