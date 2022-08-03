import { Select } from 'antd';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomLoading } from 'src/components';
import { useTickers } from 'src/hooks';
import { ExchangeEnum, Sort, TickerSortBy } from 'src/types';
import { RankingTable } from '../RankingTable';
import styles from './MarketTrend.module.scss';

const cx = classNames.bind(styles);

export const MarketTrend: React.FC = () => {
  const { t } = useTranslation();
  const SORT_MAPPING = {
    [Sort.asc]: t('Asc'),
    [Sort.desc]: t('Desc'),
  };

  const [sort, setSort] = useState(Sort.desc);
  const [exchange, setExchange] = useState(ExchangeEnum.upcom);

  const { tickers, isLoading } = useTickers({
    exchange,
    sortBy: TickerSortBy.percentChange,
    sort,
  });

  return (
    <>
      <h2 className={cx('mb-16')}>{t('WatchMarketMove')}</h2>
      <CustomLoading loading={isLoading}>
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
        <RankingTable tickers={tickers} />
      </CustomLoading>
    </>
  );
};
