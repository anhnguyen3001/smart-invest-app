import { Layout } from 'antd';
import React from 'react';
import { BackTop } from 'src/components';
import { Header } from './Header';

const { Content } = Layout;

export const PrivateLayout: React.FC = ({ children }) => {
  return (
    <Layout>
      <Header />
      <Content className="p-relative">{children}</Content>
      <BackTop />
    </Layout>
  );
};
