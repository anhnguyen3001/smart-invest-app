import { LogoutOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory } from 'react-router-dom';
import { Text, UserAvatar } from 'src/components';
import { CHANGE_PASSWORD_PATH } from 'src/constants';
import { useAuth } from 'src/context';
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
          <Text level={2} fontWeight={500}>
            {user?.username}
          </Text>
          <Text level={4} fontWeight={500} type="secondary" ellipsis>
            {user?.email}
          </Text>
        </div>

        <Button
          type="text"
          size="large"
          icon={<LogoutOutlined style={{ fontSize: 18 }} />}
        />
      </div>
    );
    // eslint-disable-next-line
  }, [JSON.stringify(user)]);

  const authMenuItem = useMemo(() => {
    return (
      <>
        <Menu.Divider className={cx('mb-16')} />
        <Menu.Item key="changePassword" className={cx('text-700', 'text-1')}>
          <NavLink to={CHANGE_PASSWORD_PATH}>{t('ChangePassword')}</NavLink>
        </Menu.Item>
      </>
    );
    // eslint-disable-next-line
  }, [JSON.stringify(user)]);

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
      zIndex={1010}
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
