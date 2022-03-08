import classNames from "classnames/bind";
import React from "react";
import Chart from "react-apexcharts";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { COLOR_THEME, DEFAULT_THEME } from "src/constants";
import styles from "./LineChart.module.scss";

const cx = classNames.bind(styles);

export interface LineChartData {
  series: { name: string; data: number[] }[];
  categories: (string | number)[];
  customColors?: string[];
}

interface LineChartProps extends LineChartData {
  showDescription?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  series,
  categories,
  showDescription = false,
  customColors,
}) => {
  const { currentTheme = DEFAULT_THEME } = useThemeSwitcher();

  const getLabelStyles = () => {
    if (showDescription) {
      return {
        style: {
          colors: COLOR_THEME[currentTheme].textSecondary,
        },
      };
    }
    return { show: false };
  };

  return (
    <Chart
      series={series}
      options={{
        chart: { fontFamily: "Roboto, sans-serif" },
        colors: customColors || [COLOR_THEME[currentTheme].primaryColor],
        xaxis: {
          categories: categories,
          tooltip: {
            enabled: false,
          },
          labels: getLabelStyles(),
          ...(!showDescription && {
            axisTicks: { show: false },
            axisBorder: { show: false },
          }),
        },
        yaxis: {
          labels: getLabelStyles(),
        },
        tooltip: {
          ...(showDescription
            ? {
                custom: ({ dataPointIndex, series, seriesIndex, w }) => `<div>
            <div class="${cx("tooltip-title")}">${
                  w.globals.categoryLabels[dataPointIndex]
                }</div>
            <div class="${cx("tooltip-content")}">${
                  series[seriesIndex][dataPointIndex]
                }</div>
          </div>`,
              }
            : { enabled: false }),
        },
        dataLabels: { enabled: false },
        grid: {
          ...(showDescription
            ? {
                borderColor: COLOR_THEME[currentTheme].borderColor,
              }
            : { show: false }),
        },
      }}
    />
  );
};
