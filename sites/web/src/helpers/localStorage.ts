export const getLS = (key: string) => {
  return localStorage.getItem(key);
};

export const setLS = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
