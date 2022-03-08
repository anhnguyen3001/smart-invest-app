import React from "react";
import { Result } from "antd";
// import { BackToHomeButton, LogoutButton } from '../../../components';
import { useTranslation } from "react-i18next";

export const Page500: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Result
      className="app-result-page"
      status="500"
      title="500"
      subTitle={t("SomethingWentWrong")}
      // extra={
      //   <>
      //     <BackToHomeButton className="mr-half" />
      //     <LogoutButton />
      //   </>
      // }
    />
  );
};
