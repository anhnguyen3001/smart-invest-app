import { Spin } from 'antd';
import { useApp } from 'src/contexts';

interface CustomLoadingProps {
  loading?: boolean;
  className?: string;
}

export const CustomLoading: React.FC<CustomLoadingProps> = ({
  loading = false,
  ...rest
}) => {
  const { loading: appLoading } = useApp();

  return <Spin spinning={!appLoading && loading} {...rest} />;
};
