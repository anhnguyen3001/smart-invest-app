export const formatNumber = (val: number): string => {
  return new Intl.NumberFormat().format(val);
};

export const getDateFromTime = (time: number): string => {
  return new Date(time * 1000).toLocaleString();
};
