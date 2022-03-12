import { Avatar, Button, Dropdown, Menu } from 'antd';
import classNames from 'classnames/bind';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import {
  CHANGE_PASSWORD_PATH,
  HOME_PATH,
  LOGIN_PATH,
  SIGNUP_PATH,
  UPDATE_PROFILE_PATH,
} from 'src/constants';
import { mockUser } from 'src/mock';
import { getNavbarLinks, MenuHeaderProps } from '../common';
import { SearchForm } from '../SearchForm';
import style from './DesktopMenu.module.scss';

const cx = classNames.bind(style);

export const DesktopMenu: React.FC<MenuHeaderProps> = ({
  activeMenuItem,
  localizationMenuItem,
  themeMenuItem,
}) => {
  const { t } = useTranslation();

  const navbarLinks = getNavbarLinks(t);

  const authMenuItem = useMemo(() => {
    // Unauthorization
    return (
      <>
        <Menu.Item key="signin" className={cx('pr-0')}>
          <NavLink to={LOGIN_PATH}>
            <Button className={cx('text-700')} type="ghost" shape="round">
              {t('Signin')}
            </Button>
          </NavLink>
        </Menu.Item>
        <Menu.Item key={SIGNUP_PATH} className={cx('pr-0', 'pl-8')}>
          <NavLink to={SIGNUP_PATH}>
            <Button className={cx('text-700')} type="primary" shape="round">
              {t('Signup')}
            </Button>
          </NavLink>
        </Menu.Item>
      </>
    );

    // Authorization
    const userMenu = (
      <Menu>
        <Menu.Item key="profile" icon={<Avatar src={mockUser.avatar} />}>
          <NavLink to={UPDATE_PROFILE_PATH}>
            <div className={cx('text-16--bold')}>{mockUser.name}</div>
            <div
              className={cx('text-13--bold', 'text-secondary', 'text-line-1')}
            >
              {mockUser.email}
            </div>
          </NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="changePassword">
          <NavLink to={CHANGE_PASSWORD_PATH}>{t('ChangePassword')}</NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>{t('Signout')}</Menu.Item>
      </Menu>
    );
    return (
      <Menu.Item>
        <Dropdown overlay={userMenu}>
          <Avatar src={mockUser.avatar} size={40} />
        </Dropdown>
      </Menu.Item>
    );
    // eslint-disable-next-line
  }, []);

  return (
    <Menu
      mode="horizontal"
      className={cx(
        'menu',
        'h-100',
        'align-items-center',
        'justify-content-between',
      )}
      selectedKeys={[activeMenuItem]}
    >
      <Menu.Item key="brand" className={cx('pl-0', 'pr-16')}>
        <NavLink to={HOME_PATH}>
          <img
            className={cx('brand')}
            alt="logo"
            src="https://sota.finance/images/Logo.svg"
          />
        </NavLink>
      </Menu.Item>
      {navbarLinks.map(({ to, title }) => (
        <Menu.Item key={to} className={cx('text-700')}>
          <NavLink to={to}>{title}</NavLink>
        </Menu.Item>
      ))}
      <Menu.Item key="search" className={cx('ml-auto', 'pr-0')}>
        <SearchForm setDefaultValue />
      </Menu.Item>

      {themeMenuItem}
      {localizationMenuItem}
      {authMenuItem}
    </Menu>
  );
};
