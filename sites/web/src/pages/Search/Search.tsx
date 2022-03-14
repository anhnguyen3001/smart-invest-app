import { Spin, Tabs } from 'antd';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InfiniteNewList, Text } from 'src/components';
import { useInfiniteNews, useQuery } from 'src/hooks';
import { AllTab, TickerList } from './components';
import { useInfiniteTickers } from './hooks';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const TAB_KEY = {
  all: 'all',
  ticker: 'ticker',
  news: 'news',
};

interface SearchProps {}

export const Search: React.FC<SearchProps> = () => {
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState(TAB_KEY.all);

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

  const totalTickers = tickers?.length || 0;
  const totalNews = news?.length || 0;

  const renderTabContent = () => {
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

    const tickerListProps = {
      tickers,
      isEmpty: tickerIsEmpty,
      hasMore: tickerHasMore,
      loading: tickerLoading,
      page: tickerPage,
      setPage: setTickerPage,
    };

    const newsListProps = {
      news,
      isEmpty: newsIsEmpty,
      hasMore: newsHasMore,
      loading: newsLoading,
      page: newsPage,
      setPage: setNewsPage,
    };

    const tabs = [
      {
        tab: renderTabTitle(t('All'), totalTickers + totalNews),
        key: TAB_KEY.all,
        children: (
          <AllTab
            tickerListProps={tickerListProps}
            newsListProps={newsListProps}
            onShowMoreTicker={() => setActiveKey(TAB_KEY.ticker)}
            onShowMoreNews={() => setActiveKey(TAB_KEY.news)}
          />
        ),
      },
      {
        tab: renderTabTitle(t('Tickers'), totalTickers),
        key: TAB_KEY.ticker,
        children: <TickerList {...tickerListProps} />,
      },
      {
        tab: renderTabTitle(t('News'), totalNews),
        key: TAB_KEY.news,
        children: <InfiniteNewList {...newsListProps} />,
      },
    ];

    return tabs.map((tabPanes) => <Tabs.TabPane {...tabPanes} />);
  };

  return (
    <Spin spinning={tickerLoading || newsLoading}>
      <div className={cx('section-md')}>
        <h2 className={cx('mb-32')}>{t('SearchResult')}</h2>
        <Tabs
          className={cx('tab')}
          activeKey={activeKey}
          onTabClick={setActiveKey}
        >
          {renderTabContent()}
        </Tabs>
      </div>
    </Spin>
  );
};
