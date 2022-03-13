import { LogoutOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory } from 'react-router-dom';
import { UserAvatar } from 'src/components';
import { CHANGE_PASSWORD_PATH, SIGNIN_PATH, SIGNUP_PATH } from 'src/constants';
import { useAuth } from 'src/context';
import { mockUser } from 'src/mock';
import { getNavbarLinks } from '../../utils';
import { SearchForm } from '../SearchForm';
import styles from './MobileMenuDrawer.module.scss';

const cx = classNames.bind(styles);

interface MobileMenuDrawerProps {
  activeMenuItem: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  activeMenuItem,
  visible,
  setVisible,
}) => {
  const history = useHistory();
  const { t } = useTranslation();

  const { user } = useAuth();

  const navbarLinks = getNavbarLinks(t);

  useEffect(() => {
    setVisible(false);
    // eslint-disable-next-line
  }, [history.location]);

  const footer = useMemo(() => {
    return (
      <>
        <NavLink to={SIGNIN_PATH} className={cx('flex-1')}>
          <Button
            className={cx('text-700', 'w-100')}
            type="ghost"
            shape="round"
          >
            {t('Signin')}
          </Button>
        </NavLink>
        <strong className={cx('text-18')}>/</strong>
        <NavLink to={SIGNUP_PATH} className={cx('flex-1')}>
          <Button
            className={cx('text-700', 'w-100')}
            type="primary"
            shape="round"
          >
            {t('Signup')}
          </Button>
        </NavLink>
      </>
    );

    return (
      <div
        className={cx(
          'd-flex',
          'align-items-center',
          'cursor-pointer',
          'w-100',
        )}
      >
        <UserAvatar user={user} size={32} />
        <div className={cx('ml-16', 'flex-1')}>
          <div className={cx('text-16--bold')}>{mockUser.name}</div>
          <div className={cx('text-13--bold', 'text-secondary', 'text-line-1')}>
            {mockUser.email}
          </div>
        </div>
        <Button
          type="text"
          size="large"
          icon={<LogoutOutlined style={{ fontSize: 18 }} />}
        />
      </div>
    );
    // eslint-disable-next-line
  }, []);

  const authMenuItem = useMemo(() => {
    return (
      <>
        <Menu.Divider className={cx('mb-16')} />
        <Menu.Item key="changePassword" className={cx('text-700')}>
          <NavLink to={CHANGE_PASSWORD_PATH}>{t('ChangePassword')}</NavLink>
        </Menu.Item>
      </>
    );
    // eslint-disable-next-line
  }, []);

  return (
    <Drawer
      className={cx('drawer')}
      width="100%"
      closable
      placement="left"
      visible={visible}
      onClose={() => setVisible(false)}
      title={<SearchForm />}
      footer={footer}
    >
      <Menu className={cx('menu')} selectedKeys={[activeMenuItem]}>
        {navbarLinks.map(({ title, to }) => (
          <Menu.Item key={to} className={cx('text-700', 'text-1')}>
            <NavLink to={to}>{title}</NavLink>
          </Menu.Item>
        ))}

        {authMenuItem}
      </Menu>
    </Drawer>
  );
};
