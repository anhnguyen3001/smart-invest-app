import React from 'react';
import { Spin } from 'antd';

interface LoadingProps {
  loading: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ loading, children }) => {
  return <Spin spinning={loading}>{children}</Spin>;
};
