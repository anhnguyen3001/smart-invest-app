import { Tabs } from 'antd';
import classNames from 'classnames/bind';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { mockTickers } from 'src/mock';
import { ITicker } from '@ah-ticker/common';
import useSWR from 'swr';
import { RankingTable } from '../RankingTable';
import styles from './MarketTrend.module.scss';

const cx = classNames.bind(styles);

const { TabPane } = Tabs;
const TAB_KEYS = {
  gainers: 'gainers',
  losers: 'losers',
};

interface MarketTrendProps {}

export const MarketTrend: React.FC<MarketTrendProps> = ({}) => {
  const { t } = useTranslation();

  const { data } = useSWR(['ranking'], async () => {
    return {
      tickerGainers: mockTickers,
      tickerLosers: mockTickers,
    };
  });

  const tabContent = useMemo(() => {
    const tabPanes: { tabKey: string; tab: string; tickers?: ITicker[] }[] = [
      {
        tabKey: TAB_KEYS.gainers,
        tab: t('Gainers'),
        tickers: data?.tickerGainers,
      },
      {
        tabKey: TAB_KEYS.losers,
        tab: t('Losers'),
        tickers: data?.tickerLosers,
      },
    ];

    return tabPanes.map(({ tickers, ...rest }) => {
      return (
        <TabPane key={rest.tabKey} {...rest}>
          <RankingTable tickers={tickers} />
        </TabPane>
      );
    });
    // eslint-disable-next-line
  }, [JSON.stringify(data)]);

  return (
    <>
      <h2 className={cx('mb-16')}>{t('WatchMarketMove')}</h2>
      <Tabs defaultActiveKey={TAB_KEYS.gainers}>{tabContent}</Tabs>
    </>
  );
};
