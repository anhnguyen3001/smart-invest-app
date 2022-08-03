import { Empty } from 'antd';
import React, { useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntersection } from 'src/hooks';
import { StyleProps } from 'src/types';

export interface InfiniteListProps extends StyleProps {
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
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersection(ref);

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  if (isEmpty) return <Empty />;
  return (
    <div ref={ref} className={className}>
      <InfiniteScroll
        style={{ overflowX: 'hidden' }}
        dataLength={dataLength}
        hasMore={isVisible && hasMore}
        loader={page > 1 && hasMore && <h4>Loading...</h4>}
        scrollThreshold={0.7}
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
    </div>
  );
};
