import { Dropdown, Menu } from 'antd';
import classNames from 'classnames/bind';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { UserAvatar } from 'src/components';
import {
  CHANGE_PASSWORD_PATH,
  HOME_PATH,
  UPDATE_PROFILE_PATH,
} from 'src/constants';
import { useAuth } from 'src/context';
import { getNavbarLinks, MenuHeaderProps } from '../../utils';
import { SearchForm } from '../SearchForm';
import style from './DesktopMenu.module.scss';

const cx = classNames.bind(style);

export const DesktopMenu: React.FC<MenuHeaderProps> = ({
  activeMenuItem,
  localizationMenuItem,
  themeMenuItem,
}) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const navbarLinks = getNavbarLinks(t);

  const authMenuItem = useMemo(() => {
    if (!user) return null;

    const userMenu = (
      <Menu>
        <Menu.Item key="profile" icon={<UserAvatar user={user} />}>
          <NavLink to={UPDATE_PROFILE_PATH} className={cx('text-500')}>
            {user?.username}
          </NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="changePassword">
          <NavLink to={CHANGE_PASSWORD_PATH}>{t('ChangePassword')}</NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={logout}>
          {t('Logout')}
        </Menu.Item>
      </Menu>
    );
    return (
      <Menu.Item key="user">
        <Dropdown overlay={userMenu} placement="bottomRight">
          <UserAvatar user={user} size={40} />
        </Dropdown>
      </Menu.Item>
    );
    // eslint-disable-next-line
  }, [JSON.stringify(user)]);

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
