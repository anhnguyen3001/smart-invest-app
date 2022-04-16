import { GetTickersParams } from '@smart-invest/common';
import { Spin } from 'antd';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { t } from 'i18next';
import {
  InfiniteNewList,
  TabContent,
  TabPaneProps,
  Text,
} from 'src/components';
import { SEARCH_PATH } from 'src/constants';
import { useApp } from 'src/contexts';
import {
  useInfiniteNews,
  useQuery,
  useTickers,
  useWindowResize,
} from 'src/hooks';
import { TickerList } from './components';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const TAB_KEY = {
  ticker: 'ticker',
  news: 'news',
};

interface SearchProps {}

export const Search: React.FC<SearchProps> = () => {
  const { isMobileView } = useWindowResize();

  const { loading: appLoading } = useApp();

  const query = useQuery();
  const q = query.get('q') || undefined;

  const [tickerParams, setTickerParams] = useState<GetTickersParams>({
    search: q,
  });

  const {
    isLoading: tickerLoading,
    pagination,
    tickers,
  } = useTickers(tickerParams, !!tickerParams?.search);

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
          <Spin spinning={tickerLoading && !appLoading}>
            {!isMobileView && <h3 className={cx('mb-16')}>{t('Tickers')}</h3>}
            <TickerList
              tickers={tickers}
              pagination={pagination}
              onChangePagination={(page, pageSize) =>
                setTickerParams({ ...tickerParams, page, pageSize })
              }
              loading={tickerLoading}
            />
          </Spin>
        ),
      },
      {
        tab: renderTabTitle(t('News'), news?.length || 0),
        key: TAB_KEY.news,
        children: (
          <>
            {!isMobileView && <h3 className={cx('mb-16')}>{t('News')}</h3>}
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
    ];
    // eslint-disable-next-line
  };

  return (
    <TabContent
      title={t('SearchResult')}
      defaultActiveKey={TAB_KEY.ticker}
      tabPanes={getTabPanes()}
      rootPath={SEARCH_PATH}
    />
  );
};
