export const thousandFormatter = (value: number | string | undefined) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const thousandParser = (value: string | undefined) => {
  if (value !== undefined) return value.replace(/\$\s?|(\,*)/g, "");
  return "";
};

export const decimalFormatter = (value: number | string | undefined) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const decimalParser = (value: string | undefined) => {
  if (value !== undefined) return value.replace(/\$\s?|(\.*)/g, "");
  return "";
};
