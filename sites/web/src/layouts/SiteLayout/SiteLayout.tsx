import { Layout } from 'antd';
import React from 'react';
import { BackTop } from 'src/components';
import { Header } from './Header';

const { Content } = Layout;

export const SiteLayout: React.FC = ({ children }) => {
  return (
    <Layout>
      <Header />
      <Content>{children}</Content>
      <BackTop />
    </Layout>
  );
};
