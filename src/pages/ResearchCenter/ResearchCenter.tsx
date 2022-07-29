import { Spin } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfiniteNewList, TabContent, TabPaneProps } from 'src/components';
import { RESEARCH_CENTER_PATH } from 'src/constants';
import { useInfiniteNews, useQuery, useWindowResize } from 'src/hooks';
import { TickerList } from './components';
import { useInfiniteTickers } from './hooks';
import styles from './ResearchCenter.module.scss';

const cx = classNames.bind(styles);

const TAB_KEY = {
  news: 'news',
  pricePredictation: 'pricePredictation',
};

export const ResearchCenter: React.FC = () => {
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
    return [
      {
        tab: t('All'),
        key: TAB_KEY.news,
        children: (
          <>
            <InfiniteNewList
              infiniteListProps={{
                className: cx('news'),
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
        key: TAB_KEY.pricePredictation,
        children: (
          <>
            {!isMobileView && (
              <h3 className={cx('mb-16')}>{t('PricePredictation')}</h3>
            )}
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
    <Spin spinning={tickerLoading || newsLoading}>
      <TabContent
        title={t('News')}
        defaultActiveKey={TAB_KEY.news}
        tabPanes={getTabPanes()}
        rootPath={RESEARCH_CENTER_PATH}
      />
    </Spin>
  );
};
