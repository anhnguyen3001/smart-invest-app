import { Col, Row } from 'antd';
import { useState } from 'react';
import { InfiniteNewList, InfiniteNewListProps } from 'src/components';
import { News } from 'src/types';

interface ReadLayoutProps extends InfiniteNewListProps {}

export const ReadLayout: React.FC<ReadLayoutProps> = ({
  infiniteListProps,
  newListProps,
}) => {
  const [selectedNews, setSelectedNews] = useState<News>();
  return (
    <>
      <InfiniteNewList
        infiniteListProps={infiniteListProps}
        newListProps={{
          size: 'large',
          ...newListProps,
        }}
      />
      
    </>
  );
};
