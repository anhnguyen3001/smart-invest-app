import { Button, Spin } from 'antd';
import classNames from 'classnames/bind';
import { t } from 'i18next';
import React, { useMemo } from 'react';
import { LineChart, LineChartData, Text } from 'src/components';
import { useTickerPrices } from '../../hooks';
import styles from './PriceChart.module.scss';

const cx = classNames.bind(styles);

interface PriceChartProps {
  symbol?: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ symbol }) => {
  const { periodOptions, period, setPeriod, isLoading, prices } =
    useTickerPrices('chartPrices', symbol);

  const renderPeriodOptions = () => {
    return periodOptions.map((duration, index) => {
      return (
        <Button
          key={index}
          shape="round"
          className="ml-8 text-700"
          onClick={() => setPeriod(duration)}
          {...(period === duration && {
            type: 'primary',
          })}
        >
          {duration}
        </Button>
      );
    });
  };

  const chartProps: LineChartData = useMemo(() => {
    const res: LineChartData = {
      categories: [],
      series: [{ name: 'price', data: [] }],
    };

    prices?.forEach(({ date, closePrice }) => {
      res.categories.push(new Date(date).toLocaleDateString());
      res.series[0].data.push(closePrice);
    });

    return res;
    // eslint-disable-next-line
  }, [JSON.stringify(prices), period]);

  return (
    <Spin spinning={isLoading} className={cx('container')}>
      <div className={cx('d-flex', 'justify-content-between')}>
        <Text level={1} fontWeight={500}>
          {t('PriceChart')}
        </Text>
        <div className={cx('d-flex', 'justify-content-end', 'mb-16')}>
          {renderPeriodOptions()}
        </div>
      </div>

      <LineChart showDescription {...chartProps} />
    </Spin>
  );
};
