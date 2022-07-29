import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TabContent, TabPaneProps } from 'src/components';
import { SETTING_PATH, SETTING_TAB_KEY } from 'src/constants';
import { ChangePassword, UpdateProfile } from './components';
import styles from './Setting.module.scss';

const cx = classNames.bind(styles);

export const Setting: React.FC = () => {
  const { t } = useTranslation();

  const tabPanes: TabPaneProps[] = [
    {
      tab: t('UpdateProfile'),
      key: SETTING_TAB_KEY.updateProfile,
      children: <UpdateProfile className={cx('content')} />,
    },
    {
      tab: t('ChangePassword'),
      key: SETTING_TAB_KEY.changePassword,
      children: <ChangePassword className={cx('content')} />,
    },
  ];

  return (
    <TabContent
      title={t('Setting')}
      tabPanes={tabPanes}
      defaultActiveKey={SETTING_TAB_KEY.updateProfile}
      rootPath={SETTING_PATH}
    />
  );
};
