import React from 'react';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

ReactDOM.render(
  <ThemeSwitcherProvider
    themeMap={themes}
    insertionPoint="styles-insertion-point"
  >
    <App />
  </ThemeSwitcherProvider>,
  document.getElementById('root'),
);
