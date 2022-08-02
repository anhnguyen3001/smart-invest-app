import { Spin } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfiniteNewList, TabContent, TabPaneProps } from 'src/components';
import { NEWS_PATH } from 'src/constants';
import { useApp } from 'src/contexts';
import { useInfiniteNews, useQuery, useInfiniteTickers } from 'src/hooks';
import { TickerList } from './components';

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
    tickers,
    isLoading: tickerLoading,
    hasMore: tickerHasMore,
    isEmpty: tickerIsEmpty,
    page: tickerPage,
    setPage: setTickerPage,
  } = useInfiniteTickers({ q, pageSize: 12 });

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
                size: 'large',
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
            <TickerList
              tickers={tickers}
              isEmpty={tickerIsEmpty}
              hasMore={tickerHasMore}
              loading={tickerLoading}
              page={tickerPage}
              setPage={setTickerPage}
            />
          </>
        ),
      },
    ];
    // eslint-disable-next-line
  };

  return (
    <Spin spinning={!appLoading && (tickerLoading || newsLoading)}>
      <TabContent
        title={t('News')}
        defaultActiveKey={TAB_KEY.all}
        tabPanes={getTabPanes()}
        rootPath={NEWS_PATH}
      />
    </Spin>
  );
};
