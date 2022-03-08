import { Tabs } from 'antd';
import classNames from 'classnames/bind';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { mockTickers } from 'src/mock';
import { ITicker } from 'src/types';
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
      stockGainers: mockTickers,
      stockLosers: mockTickers,
    };
  });

  const tabContent = useMemo(() => {
    const tabPanes: { tabKey: string; tab: string; stocks?: ITicker[] }[] = [
      {
        tabKey: TAB_KEYS.gainers,
        tab: t('Gainers'),
        stocks: data?.stockGainers,
      },
      {
        tabKey: TAB_KEYS.losers,
        tab: t('Losers'),
        stocks: data?.stockLosers,
      },
    ];

    return tabPanes.map(({ stocks, ...rest }) => {
      return (
        <TabPane key={rest.tabKey} {...rest}>
          <RankingTable stocks={stocks} />
        </TabPane>
      );
    });
    // eslint-disable-next-line
  }, [JSON.stringify(data)]);

  return (
    <>
      <h2 className={cx('mb-base')}>{t('WatchMarketMove')}</h2>
      <Tabs defaultActiveKey={TAB_KEYS.gainers}>{tabContent}</Tabs>
    </>
  );
};
