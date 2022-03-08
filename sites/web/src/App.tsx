import { ConfigProvider, Spin } from 'antd';
import React, { Suspense } from 'react';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { BrowserRouter as Router } from 'react-router-dom';
import 'src/styles/theme.css';
import './App.scss';
import { REGIONS } from './constants';
import { getLanguage } from './helpers';
import { AppLayout } from './layouts';
import { PublicRoutes } from './routes';

const themes = {
  dark: `/css/dark-theme.css`,
  light: `/css/light-theme.css`,
};

const App: React.FC = () => {
  return (
    <Suspense fallback={<Spin spinning={true} />}>
      <ThemeSwitcherProvider
        themeMap={themes}
        insertionPoint="styles-insertion-point"
      >
        <ConfigProvider locale={REGIONS[getLanguage()].antdLocale}>
          <Router>
            <AppLayout>
              <PublicRoutes />
            </AppLayout>
          </Router>
        </ConfigProvider>
      </ThemeSwitcherProvider>
    </Suspense>
  );
};

export default App;
