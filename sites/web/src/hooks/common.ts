import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TABLET_WIDTH } from 'src/constants';
import { getWindowDimensions } from 'src/helpers';

export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => setDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { ...dimensions, isTabletView: dimensions.width <= TABLET_WIDTH };
};

export const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};
