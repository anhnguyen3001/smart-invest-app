import { Layout, Menu } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LocaleSelection, ThemeSwitcher } from 'src/components';
import { ANALYTICS_PATH, HOME_PATH, WATCH_LIST_PATH } from 'src/constants';
import { useWindowResize } from 'src/hooks';
import { DesktopMenu, MobileMenu } from './components';
import style from './Header.module.scss';

const cx = classNames.bind(style);

export const Header: React.FC = () => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState('');
  useEffect(() => {
    const isMatchRoute = (path: string) => {
      return path === location.pathname.toLowerCase();
    };

    if (isMatchRoute(ANALYTICS_PATH)) {
      setActiveMenuItem(ANALYTICS_PATH);
    } else if (isMatchRoute(WATCH_LIST_PATH)) {
      setActiveMenuItem(WATCH_LIST_PATH);
    } else if (isMatchRoute(HOME_PATH)) {
      setActiveMenuItem(HOME_PATH);
    }
  }, [location.pathname]);

  const { isTabletView } = useWindowResize();

  const themeMenuItem = (
    <Menu.Item key="theme">
      <ThemeSwitcher />
    </Menu.Item>
  );

  const localizationMenuItem = (
    <Menu.Item key="localization" className={cx('px-0')}>
      <LocaleSelection />
    </Menu.Item>
  );

  return (
    <Layout.Header className={cx('wrapper', 'p-0')}>
      {!isTabletView ? (
        <DesktopMenu
          activeMenuItem={activeMenuItem}
          themeMenuItem={themeMenuItem}
          localizationMenuItem={localizationMenuItem}
        />
      ) : (
        <MobileMenu
          activeMenuItem={activeMenuItem}
          themeMenuItem={themeMenuItem}
          localizationMenuItem={localizationMenuItem}
        />
      )}
    </Layout.Header>
  );
};
