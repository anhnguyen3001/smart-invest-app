import React from 'react';
import Chart from 'react-apexcharts';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useTranslation } from 'react-i18next';
import { COLOR_THEME, DEFAULT_THEME } from 'src/constants';

interface CandleStickChartProps {
  // Format: [time, o, h, l, c]
  data?: any[];
  className?: string;
  noDataText?: string;
}

export const CandleStickChart: React.FC<CandleStickChartProps> = ({
  data = [],
  noDataText,
  ...rest
}) => {
  const { t } = useTranslation();
  const { currentTheme = DEFAULT_THEME } = useThemeSwitcher();

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
