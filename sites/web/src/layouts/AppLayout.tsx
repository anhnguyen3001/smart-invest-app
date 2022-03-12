import { Layout } from 'antd';
import React from 'react';
import { BackTop } from 'src/components';
import { AppHeader } from './AppHeader';

const { Content } = Layout;

export const AppLayout: React.FC = ({ children }) => {
  return (
    <Layout>
      <AppHeader />
      <Content>{children}</Content>
      <BackTop />
    </Layout>
  );
};
