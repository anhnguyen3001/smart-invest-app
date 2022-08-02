import { Layout, Menu } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LocaleSelection, ThemeSwitcher } from 'src/components';
import { NEWS_PATH, HOME_PATH, LIBRARY_PATH } from 'src/constants';
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

    if (isMatchRoute(NEWS_PATH)) {
      setActiveMenuItem(NEWS_PATH);
    } else if (isMatchRoute(LIBRARY_PATH)) {
      setActiveMenuItem(LIBRARY_PATH);
    } else if (isMatchRoute(HOME_PATH)) {
      setActiveMenuItem(HOME_PATH);
    } else {
      setActiveMenuItem('');
    }
  }, [location.pathname]);

  const { isDesktopView } = useWindowResize();

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
      {isDesktopView ? (
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
