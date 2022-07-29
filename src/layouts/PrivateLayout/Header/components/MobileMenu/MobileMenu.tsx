import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HOME_PATH } from 'src/constants';
import { MenuHeaderProps } from '../../utils';
import { MobileMenuDrawer } from '../MobileMenuDrawer';
import styles from './MobileMenu.module.scss';

const cx = classNames.bind(styles);

export const MobileMenu: React.FC<MenuHeaderProps> = ({
  activeMenuItem,
  themeMenuItem,
  localizationMenuItem,
}) => {
  const [visibleMenu, setVisibleMenu] = useState(false);

  return (
    <>
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

        <Menu.Item
          key="search"
          className={cx('px-0', 'ml-auto')}
          onClick={() => setVisibleMenu(true)}
        >
          <Button
            icon={<SearchOutlined style={{ fontSize: 14 }} />}
            type="ghost"
            shape="circle"
            size="large"
          />
        </Menu.Item>

        {themeMenuItem}
        {localizationMenuItem}

        <Menu.Item key="toggle-menu" className={cx('pr-0')}>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 18 }} />}
            onClick={() => setVisibleMenu((prev) => !prev)}
          />
        </Menu.Item>
      </Menu>

      <MobileMenuDrawer
        visible={visibleMenu}
        setVisible={setVisibleMenu}
        activeMenuItem={activeMenuItem}
      />
    </>
  );
};
