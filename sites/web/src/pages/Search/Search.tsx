import { Spin } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  InfiniteNewList,
  TabContent,
  TabPaneProps,
  Text,
} from 'src/components';
import { useInfiniteNews, useQuery, useWindowResize } from 'src/hooks';
import { TickerList } from './components';
import { useInfiniteTickers } from './hooks';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const TAB_KEY = {
  ticker: 'ticker',
  news: 'news',
};

interface SearchProps {}

export const Search: React.FC<SearchProps> = () => {
  const { t } = useTranslation();
  const { isMobileView } = useWindowResize();

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
  } = useInfiniteNews({ q });

  const getTabPanes = (): TabPaneProps[] => {
    const renderTabTitle = (name: string, total?: number) => {
      return (
        <>
          {name}
          <Text
            level={4}
            block={false}
            className={cx('total', 'px-8', 'py-4', 'ml-8')}
          >
            ({total})
          </Text>
        </>
      );
    };

    return [
      {
        tab: renderTabTitle(t('Tickers'), tickers?.length || 0),
        key: TAB_KEY.ticker,
        children: (
          <>
            {!isMobileView && <h3 className={cx('mb-16')}>{t('Tickers')}</h3>}
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
      {
        tab: renderTabTitle(t('News'), news?.length || 0),
        key: TAB_KEY.news,
        children: (
          <>
            {!isMobileView && <h3 className={cx('mb-16')}>{t('News')}</h3>}
            <InfiniteNewList
              news={news}
              isEmpty={newsIsEmpty}
              hasMore={newsHasMore}
              loading={newsLoading}
              page={newsPage}
              setPage={setNewsPage}
            />
          </>
        ),
      },
    ];
    // eslint-disable-next-line
  };

  return (
    <Spin spinning={tickerLoading || newsLoading}>
      <TabContent
        title={t('SearchResult')}
        defaultActiveKey={TAB_KEY.ticker}
        tabPanes={getTabPanes()}
      />
    </Spin>
  );
};
