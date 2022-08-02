import { Button, Spin } from 'antd';
import React, { useMemo } from 'react';
import { CandleStickChart } from 'src/components';
import { useTickerPrices } from '../../hooks';

interface TradingDataProps {
  symbol: string;
}

export const TradingData: React.FC<TradingDataProps> = ({ symbol }) => {
  const { prices, isLoading, period, setPeriod, periodOptions } =
    useTickerPrices('candlePrices', symbol);

  // Format: {x:time, y: [o, h, l, c]}[]
  const chartPricedata = useMemo(() => {
    return prices?.map(
      ({ date, openPrice, maxPrice, minPrice, closePrice }) => ({
        x: new Date(date).toLocaleDateString(),
        y: [openPrice, maxPrice, minPrice, closePrice],
      }),
    );
    // eslint-disable-next-line
  }, [JSON.stringify(prices)]);

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
        <CandleStickChart
          loading={isLoading}
          prices={prices}
          data={chartPricedata}
        />
      </Spin>
    </>
  );
};
