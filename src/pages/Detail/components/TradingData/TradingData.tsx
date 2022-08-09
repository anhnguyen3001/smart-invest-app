import { Button, Spin } from 'antd';
import React from 'react';
import { CandleStickChart } from 'src/components';
import { useTickerPrices } from '../../hooks';

interface TradingDataProps {
  symbol: string;
}

export const TradingData: React.FC<TradingDataProps> = ({ symbol }) => {
  const { prices, isLoading, period, setPeriod, periodOptions } =
    useTickerPrices('candlePrices', symbol);

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
    <>
      <div className="d-flex justify-content-end mb-16">
        {renderPeriodOptions()}
      </div>

      <Spin spinning={isLoading}>
        <CandleStickChart prices={prices} />
      </Spin>
    </>
  );
};
