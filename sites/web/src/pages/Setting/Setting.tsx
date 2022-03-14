import React from 'react';
import { useTranslation } from 'react-i18next';
import { SETTING_TAB_KEY } from 'src/constants';
import { useQuery } from 'src/hooks';
import { TabContent, TabPaneProps } from 'src/components';
import { ChangePassword, UpdateProfile } from './components';

export const Setting: React.FC = () => {
  const { t } = useTranslation();

  const query = useQuery();
  const defaultActiveKey = query.get('tab') || SETTING_TAB_KEY.updateProfile;

  const tabPanes: TabPaneProps[] = [
    {
      tab: t('UpdateProfile'),
      key: SETTING_TAB_KEY.updateProfile,
      children: <UpdateProfile />,
    },
    {
      tab: t('ChangePassword'),
      key: SETTING_TAB_KEY.changePassword,
      children: <ChangePassword />,
    },
  ];

  return (
    <TabContent
      title={t('Setting')}
      tabPanes={tabPanes}
      defaultActiveKey={defaultActiveKey}
    />
  );
};
