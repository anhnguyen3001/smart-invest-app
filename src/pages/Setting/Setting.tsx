import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TabContent, TabPaneProps } from 'src/components';
import { LIBRARY_PATH, PERSONAL_TAB_KEY } from 'src/constants';
import { ChangePassword, Library, UpdateProfile } from './components';
import styles from './Setting.module.scss';

const cx = classNames.bind(styles);

export const Setting: React.FC = () => {
  const { t } = useTranslation();

  const tabPanes: TabPaneProps[] = [
    {
      tab: t('Library'),
      key: PERSONAL_TAB_KEY.library,
      children: <Library className={cx('content')} />,
    },
    {
      tab: t('UpdateProfile'),
      key: PERSONAL_TAB_KEY.updateProfile,
      children: <UpdateProfile className={cx('content')} />,
    },
    {
      tab: t('ChangePassword'),
      key: PERSONAL_TAB_KEY.changePassword,
      children: <ChangePassword className={cx('content')} />,
    },
  ];

  return (
    <TabContent
      title={t('Personal')}
      tabPanes={tabPanes}
      defaultActiveKey={PERSONAL_TAB_KEY.library}
      rootPath={LIBRARY_PATH}
    />
  );
};
