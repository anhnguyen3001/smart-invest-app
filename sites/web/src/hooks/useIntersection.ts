import { useEffect, useState } from 'react';

export const useIntersection = (element: React.RefObject<HTMLElement>) => {
  const [isVisible, setState] = useState(false);
  const { current } = element || {};

  useEffect(() => {
    if (current) {
      const observer = new IntersectionObserver(([entry]) => {
        setState(entry.isIntersecting);
      });

      observer.observe(current);

      return () => {
        current && observer.unobserve(current);
      };
    }
  }, [current]);

  return isVisible;
};
