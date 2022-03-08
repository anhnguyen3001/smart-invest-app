import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { COLOR_THEME, THEME } from "src/constants";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

interface PriceLineChartProps {
  labels: string[];
  prices: number[];
  isIncreasing?: boolean;
}

export const PriceLineChart: React.FC<PriceLineChartProps> = ({
  labels,
  prices,
  isIncreasing = false,
}) => {
  const { currentTheme = THEME.DARK } = useThemeSwitcher();

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            data: prices,
            borderColor: isIncreasing
              ? COLOR_THEME[currentTheme].successColor
              : COLOR_THEME[currentTheme].errorColor,
          },
        ],
      }}
      options={{
        responsive: true,
        scales: {
          x: { display: false },
          y: { display: false },
        },
        elements: {
          point: { radius: 0 },
        },
      }}
    />
  );
};
