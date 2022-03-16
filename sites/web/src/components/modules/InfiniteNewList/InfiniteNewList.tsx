import { INews } from '@ah-ticker/common';
import React from 'react';
import { InfiniteList, InfiniteListProps } from 'src/components';
import { NewsList, NewsListProps } from '../NewsList';

export interface InfiniteNewListProps {
  newListProps: NewsListProps;
  infiniteListProps: Omit<InfiniteListProps, 'dataLength'>;
}

export const InfiniteNewList: React.FC<InfiniteNewListProps> = ({
  newListProps,
  infiniteListProps,
}) => {
  return (
    <InfiniteList
      dataLength={newListProps?.news?.length || 0}
      {...infiniteListProps}
    >
      <NewsList {...newListProps} />
    </InfiniteList>
  );
};
