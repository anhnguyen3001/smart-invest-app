export const getWindowDimensions = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

export const isScrollEnded = (event: React.UIEvent<HTMLDivElement>) => {
  const { scrollTop, offsetHeight, scrollHeight }: any = event.target;
  return Math.abs(scrollTop + offsetHeight - scrollHeight) <= 1;
};
