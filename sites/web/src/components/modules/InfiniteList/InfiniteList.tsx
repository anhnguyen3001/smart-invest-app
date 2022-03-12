import { Empty } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface InfiniteListProps {
  dataLength: number;
  hasMore: boolean;
  isEmpty: boolean;
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
}

export const InfiniteList: React.FC<InfiniteListProps> = ({
  hasMore,
  isEmpty,
  page,
  setPage,
  dataLength,
  children,
  loading,
}) => {
  const fetchNextPage = () => {
    setPage(page + 1);
  };

  if (isEmpty) return <Empty />;

  return (
    <InfiniteScroll
      style={{ overflowX: 'hidden' }}
      dataLength={dataLength}
      hasMore={hasMore}
      loader={page > 1 && <h4>Loading...</h4>}
      // loader={
      //   <Spin
      //     style={{
      //       position: 'relative',
      //       left: '50%',
      //       transform: 'translateX(-50%)',
      //     }}
      //     spinning={loading}
      //   />
      // }
      next={fetchNextPage}
    >
      {children}
    </InfiniteScroll>
  );
};
