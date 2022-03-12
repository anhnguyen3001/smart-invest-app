import React from 'react';
import { Result } from 'antd';
// import { BackToHomeButton, LogoutButton } from '../../../components';
import { useTranslation } from 'react-i18next';

export const Page403: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Result
      className="app-result-page"
      status="403"
      title="403"
      subTitle={t('PermissionDenied')}
      // extra={
      //   <>
      //     <BackToHomeButton className="mr-8" />
      //     <LogoutButton />
      //   </>
      // }
    />
  );
};
