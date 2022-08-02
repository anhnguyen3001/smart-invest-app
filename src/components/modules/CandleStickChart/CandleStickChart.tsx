import React from 'react';
import Chart from 'react-apexcharts';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useTranslation } from 'react-i18next';
import { COLOR_THEME, DEFAULT_THEME, THEME } from 'src/constants';
import { TickerPrice } from 'src/types';
import TradingChart from '@qognicafinance/react-lightweight-charts';
import { Text } from 'src/components/elements';

interface CandleStickChartProps {
  prices?: TickerPrice[];
  loading?: boolean;
  data?: any[];
  className?: string;
  noDataText?: string;
}

export const CandleStickChart: React.FC<CandleStickChartProps> = ({
  prices = [],
  loading,
  data = [],
  noDataText,
  ...rest
}) => {
  const { t } = useTranslation();
  const { currentTheme = DEFAULT_THEME } = useThemeSwitcher();

  const totalData = prices.length;

  const containerStyle = { maxHeight: 500, minHeight: 300 };

  if (!loading && !totalData) {
    return (
      <div
        style={{
          ...containerStyle,
          backgroundColor: COLOR_THEME[currentTheme].lightBg,
          borderRadius: 4,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <Text type="secondary" fontWeight={700}>
          {noDataText || t('NoDataToDisplay')}
        </Text>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <TradingChart
        autoHeight
        autoWidth
        darkTheme={currentTheme === THEME.DARK}
        options={{
          localization: { locale: 'vi-VI' },
          layout: {
            backgroundColor: COLOR_THEME[currentTheme].lightBg,
            fontFamily: 'Roboto, sans-serif',
            textColor: COLOR_THEME[currentTheme].textPrimary,
            fontSize: 12,
          },
        }}
        candlestickSeries={[
          {
            data: prices?.map(
              ({ openPrice, maxPrice, minPrice, closePrice, date }) => ({
                open: openPrice,
                high: maxPrice,
                low: minPrice,
                close: closePrice,
                time: date,
              }),
            ),
          },
        ]}
      />
    </div>
  );

  return (
    <Chart
      height={350}
      type="candlestick"
      series={[
        {
          data,
        },
      ]}
      options={{
        chart: {
          id: 'trading-candle-stick',
        },
        xaxis: {
          type: 'datetime',
        },
        noData: {
          text: noDataText || t('NoDataToDisplay'),
          style: {
            color: COLOR_THEME[currentTheme].textPrimary,
            fontSize: '16px',
          },
        },
      }}
      {...rest}
    />
  );
};
