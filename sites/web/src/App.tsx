import { ConfigProvider } from 'antd';
import React, { Suspense, useEffect } from 'react';
import 'src/styles/theme.css';
import './App.scss';
import { Loading } from './components';
import { LOCAL_STORAGE, REGIONS, THEME } from './constants';
import { AppProvider, AuthProvider } from './context';
import { getLanguage, getLS } from './helpers';
import { useTheme } from './hooks';
import { Routes } from './routes';
import { initApiService } from './services';

const App: React.FC = () => {
  const { changeTheme } = useTheme();

  useEffect(() => {
    initApiService();

    const defaultTheme = getLS(LOCAL_STORAGE.APP_THEME) || THEME.DARK;
    changeTheme(defaultTheme);
    // eslint-disable-next-line
  }, []);

  return (
    <Suspense fallback={<Loading loading={true} />}>
      <ConfigProvider locale={REGIONS[getLanguage()].antdLocale}>
        <AppProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </AppProvider>
      </ConfigProvider>
    </Suspense>
  );
};

export default App;
