import { Dropdown, Layout, Menu } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import darkThemeIcon from 'src/assets/images/dark-theme.svg';
import lightThemeIcon from 'src/assets/images/light-theme.svg';
import {
  ANALYTICS_PATH,
  HOME_PATH,
  REGIONS,
  THEME,
  WATCH_LIST_PATH,
} from 'src/constants';
import { useLanguage, useTheme, useWindowDimensions } from 'src/hooks';
import style from './Header.module.scss';
import { DesktopMenu, MobileMenu } from './components';

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

  const { isTabletView } = useWindowDimensions();

  const { currentTheme, changeTheme } = useTheme();
  const onChangeTheme = () => {
    const nextTheme = currentTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    changeTheme(nextTheme);
  };

  const { currentLanguage, changeLanguage } = useLanguage();
  const currentRegion = REGIONS[currentLanguage];

  const localizationMenu = (
    <Menu>
      {Object.values(REGIONS).map((el) => (
        <Menu.Item key={el.key} onClick={() => changeLanguage(el.key)}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {el.flag}
            <span style={{ marginLeft: 10 }}>{el.name}</span>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  const themeMenuItem = useMemo(() => {
    return (
      <Menu.Item key="theme" onClick={onChangeTheme}>
        <img
          alt="theme toggle"
          src={currentTheme === THEME.DARK ? darkThemeIcon : lightThemeIcon}
        />
      </Menu.Item>
    );
    // eslint-disable-next-line
  }, [currentTheme]);

  const localizationMenuItem = useMemo(() => {
    return (
      <Menu.Item key="localization" className={cx('px-0')}>
        <Dropdown
          overlay={localizationMenu}
          placement="bottomRight"
          overlayStyle={{ top: 16 }}
          overlayClassName={cx('localization-menu')}
        >
          {currentRegion?.flag}
        </Dropdown>
      </Menu.Item>
    );
    // eslint-disable-next-line
  }, [currentLanguage]);

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
