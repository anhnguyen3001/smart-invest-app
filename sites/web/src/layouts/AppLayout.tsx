import classNames from "classnames/bind";
import React from "react";
import { AppHeader } from "./AppHeader";
import styles from "./AppLayout.module.scss";
import { Layout } from "antd";

const { Content } = Layout;

const cx = classNames.bind(styles);

export const AppLayout: React.FC = ({ children }) => {
  return (
    <Layout>
      <AppHeader />
      <Content className={cx("content")}>{children}</Content>
    </Layout>
  );
};
