import { ConfigProvider, Spin } from 'antd';
import React, { Suspense, useEffect } from 'react';
import 'src/styles/theme.css';
import './App.scss';
import { LOCAL_STORAGE, REGIONS, THEME } from './constants';
import { AuthProvider } from './context';
import { getLanguage, getLS } from './helpers';
import { useTheme } from './hooks';
import { Routes } from './routes';

const App: React.FC = () => {
  const { changeTheme } = useTheme();

  useEffect(() => {
    const defaultTheme = getLS(LOCAL_STORAGE.APP_THEME) || THEME.DARK;
    changeTheme(defaultTheme);
    // eslint-disable-next-line
  }, []);

  return (
    <Suspense fallback={<Spin spinning={true} />}>
      <ConfigProvider locale={REGIONS[getLanguage()].antdLocale}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ConfigProvider>
    </Suspense>
  );
};

export default App;
