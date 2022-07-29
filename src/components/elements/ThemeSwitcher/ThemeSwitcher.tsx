import React from 'react';
import darkThemeIcon from 'src/assets/images/dark-theme.svg';
import lightThemeIcon from 'src/assets/images/light-theme.svg';
import { THEME } from 'src/constants';
import { useTheme } from 'src/hooks';

export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, changeTheme } = useTheme();
  const onChangeTheme = () => {
    const nextTheme = currentTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    changeTheme(nextTheme);
  };

  return (
    <img
      className="d-block"
      src={currentTheme === THEME.DARK ? darkThemeIcon : lightThemeIcon}
      alt="theme toggle"
      onClick={onChangeTheme}
    />
  );
};
