export const formatNumber = (val: number): string => {
  return new Intl.NumberFormat().format(val);
};
