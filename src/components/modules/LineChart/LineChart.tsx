import Chart from '@qognicafinance/react-lightweight-charts';
import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components/elements';
import { COLOR_THEME, DEFAULT_THEME, THEME } from 'src/constants';
import { TickerPrice } from 'src/types';

export interface LineChartData {
  noDataText?: string;
  prices?: { time?: string; value: number }[];
  loading?: boolean;
}

interface LineChartProps extends LineChartData {}

export const LineChart: React.FC<LineChartProps> = React.memo(
  ({ noDataText, prices = [], loading }) => {
    const { t } = useTranslation();
    const { currentTheme = DEFAULT_THEME } = useThemeSwitcher();

    const totalData = prices.length;

    const containerStyle = { maxHeight: 400, minHeight: 300 };

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
        <Chart
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
          lineSeries={[
            {
              data: prices,
              options: {
                noDataText: noDataText || 'Không có dữ liệu',
                color:
                  prices?.[totalData - 1]?.value >
                  prices?.[totalData - 2]?.value
                    ? COLOR_THEME[currentTheme].successColor
                    : COLOR_THEME[currentTheme].errorColor,
              },
            },
          ]}
        />
      </div>
    );
  },
);
