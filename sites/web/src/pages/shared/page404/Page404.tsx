import React from 'react';
import { Result } from 'antd';
// import { BackToHomeButton, LogoutButton } from '../../../components';
import { useTranslation } from 'react-i18next';

export const Page404: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Result
      className="app-result-page"
      status="404"
      title="404"
      subTitle={t('PageNotFound')}
      // extra={
      //   <>
      //     <BackToHomeButton className="mr-8" />
      //     <LogoutButton />
      //   </>
      // }
    />
  );
};
