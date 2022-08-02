import { Button, Spin } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { LineChart, Text } from 'src/components';
import { useTickerPrices } from '../../hooks';
import styles from './PriceChart.module.scss';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

interface PriceChartProps {
  symbol?: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ symbol }) => {
  const { t } = useTranslation();
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

      <LineChart loading={isLoading} prices={prices} />
    </Spin>
  );
};
