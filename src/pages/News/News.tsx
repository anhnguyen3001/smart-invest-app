import { Spin } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfiniteNewList, TabContent, TabPaneProps } from 'src/components';
import { NEWS_PATH } from 'src/constants';
import { useApp } from 'src/contexts';
import { useInfiniteNews, useQuery } from 'src/hooks';
import { ReadLayout } from './components';

const TAB_KEY = {
  all: 'all',
  favoriteList: 'favoriteList',
};

export const News: React.FC = () => {
  const { t } = useTranslation();
  const { loading: appLoading } = useApp();

  const query = useQuery();
  const q = query.get('q') || undefined;

  const {
    news,
    isLoading: newsLoading,
    hasMore: newsHasMore,
    isEmpty: newsIsEmpty,
    page: newsPage,
    setPage: setNewsPage,
  } = useInfiniteNews({ pageSize: 20 });

  const getTabPanes = (): TabPaneProps[] => {
    return [
      {
        tab: t('All'),
        key: TAB_KEY.all,
        children: (
          <>
            <InfiniteNewList
              infiniteListProps={{
                isEmpty: newsIsEmpty,
                hasMore: newsHasMore,
                loading: newsLoading,
                page: newsPage,
                setPage: setNewsPage,
              }}
              newListProps={{
                news,
              }}
            />
          </>
        ),
      },
      {
        tab: t('FavoriteList'),
        key: TAB_KEY.favoriteList,
        children: (
          <>
            <div></div>
          </>
        ),
      },
    ];
    // eslint-disable-next-line
  };

  return (
    <Spin spinning={!appLoading && newsLoading}>
      <TabContent
        title={t('News')}
        defaultActiveKey={TAB_KEY.all}
        tabPanes={getTabPanes()}
        rootPath={NEWS_PATH}
      />
    </Spin>
  );
};
