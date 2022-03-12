import { INews } from '@ah-ticker/common';
import React from 'react';
import { InfiniteList, InfiniteListProps } from 'src/components';
import { NewsList } from '../NewsList';

export interface InfiniteNewListProps
  extends Omit<InfiniteListProps, 'dataLength'> {
  news?: INews[];
}

export const InfiniteNewList: React.FC<InfiniteNewListProps> = ({
  news,
  ...rest
}) => {
  return (
    <InfiniteList dataLength={news?.length || 0} {...rest}>
      <NewsList news={news} />
    </InfiniteList>
  );
};
