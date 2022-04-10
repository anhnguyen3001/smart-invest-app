import { DEFAULT_LANG, LOCAL_STORAGE } from 'src/constants';

export const getLanguage = () => {
  return localStorage.getItem(LOCAL_STORAGE.LOCALIZATION) || DEFAULT_LANG;
};

export const changeLanguage = (language: string) => {
  if (language === getLanguage()) return;

  localStorage.setItem(LOCAL_STORAGE.LOCALIZATION, language);
  window.location.reload();
};
