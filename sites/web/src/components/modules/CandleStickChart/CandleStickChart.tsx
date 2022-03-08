import React from "react";
import Chart from "react-apexcharts";

interface CandleStickChartProps {
  // Format: [time, o, h, l, c]
  data: number[];
  className?: string;
}

export const CandleStickChart: React.FC<CandleStickChartProps> = ({
  data,
  ...rest
}) => {
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
          id: "trading-candle-stick",
        },
        xaxis: {
          type: "datetime",
        },
      }}
      {...rest}
    />
  );
};
