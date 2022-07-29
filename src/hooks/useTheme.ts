import { useThemeSwitcher } from 'react-css-theme-switcher';
import { LOCAL_STORAGE } from 'src/constants';
import { getLS, setLS } from 'src/helpers';

export const useTheme = () => {
  const { switcher, currentTheme } = useThemeSwitcher();

  const changeTheme = (theme: string) => {
    switcher({ theme: theme });

    document.body.setAttribute('data-theme', theme);
    if (getLS(LOCAL_STORAGE.APP_THEME) !== theme) {
      setLS(LOCAL_STORAGE.APP_THEME, theme);
    }
  };

  return {
    currentTheme,
    changeTheme,
  };
};