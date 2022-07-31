import { Select, Tabs } from 'antd';
import classNames from 'classnames/bind';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { tickerService } from 'src/api';
import { mockTickers } from 'src/mock';
import { ExchangeEnum, Sort, Ticker } from 'src/types';
import useSWR from 'swr';
import { RankingTable } from '../RankingTable';
import styles from './MarketTrend.module.scss';

const cx = classNames.bind(styles);

const { TabPane } = Tabs;
const TAB_KEYS = {
  all: 'all',
  favorite: 'favorite',
};

export const MarketTrend: React.FC = () => {
  const { t } = useTranslation();
  const SORT_MAPPING = {
    [Sort.asc]: t('Asc'),
    [Sort.desc]: t('Desc'),
  };

  const [sort, setSort] = useState(Sort.desc);
  const [exchange, setExchange] = useState(ExchangeEnum.upcom);

  const { data: tickerData, error: tickerLoading } = useSWR(
    ['tickers', sort, exchange],
    async () => {
      const res = await tickerService.getTickers({
        sort,
        exchange,
      });
      return res;
    },
    { revalidateOnFocus: false },
  );

  const { data } = useSWR(['ranking'], async () => {
    return {
      tickerGainers: mockTickers,
      tickerLosers: mockTickers,
    };
  });

  const tabContent = useMemo(() => {
    return (
      <>
        <TabPane key={TAB_KEYS.all} tab={t('All')}>
          <div className="d-flex justify-content-end mb-16">
            <Select
              className="mr-8"
              placeholder={t('Sort')}
              value={sort}
              options={Object.values(Sort).map((value) => ({
                value,
                label: SORT_MAPPING[value],
              }))}
              onChange={setSort}
            />

            <Select
              placeholder={t('Exchange')}
              value={exchange}
              options={Object.values(ExchangeEnum).map((exchange) => ({
                value: exchange,
                label: exchange,
              }))}
              onChange={setExchange}
            />
          </div>
          <RankingTable tickers={data?.tickerGainers} />
        </TabPane>
        <TabPane key={TAB_KEYS.favorite} tab={t('FavoriteMost')}>
          <RankingTable tickers={data?.tickerGainers} />
        </TabPane>
      </>
    );
    // eslint-disable-next-line
  }, [JSON.stringify(data)]);

  return (
    <>
      <h2 className={cx('mb-16')}>{t('WatchMarketMove')}</h2>
      <Tabs defaultActiveKey={TAB_KEYS.all}>{tabContent}</Tabs>
    </>
  );
};
