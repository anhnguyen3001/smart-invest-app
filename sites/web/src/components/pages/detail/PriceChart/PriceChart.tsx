import { Button, Spin } from 'antd';
import classNames from 'classnames/bind';
import React, { useMemo, useState } from 'react';
import { LineChart, LineChartData } from 'src/components';
import { tradingPrices } from 'src/mock';
import useSWR from 'swr';
import styles from './PriceChart.module.scss';

const cx = classNames.bind(styles);

interface PriceChartProps {
  name: string;
}

export const PriceChart: React.FC<PriceChartProps> = ({ name }) => {
  const rangeTimes = ['15D', '1M', '3M'];
  const [selectedTime, setSelectedTime] = useState<string>(rangeTimes[0]);
  // const durationOptions: LabeledValue[] = [
  //   { label: t('15days'), value: '15D' },
  //   { label: t('1month'), value: '1M' },
  //   { label: t('3months'), value: '3M' },
  // ];

  const { data: prices, error } = useSWR(
    ['prices', name, selectedTime],
    async () => {
      return tradingPrices;
    },
  );
  const isLoading = !prices && !error;

  const onChangeRangeTime = (time: string) => {
    setSelectedTime(time);
  };

  const renderRangeTimes = () => {
    return rangeTimes.map((time, index) => {
      return (
        <Button
          key={index}
          shape="round"
          className="ml-half text-700"
          onClick={() => onChangeRangeTime(time)}
          {...(selectedTime === time && {
            type: 'primary',
          })}
        >
          {time}
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
  }, [JSON.stringify(prices)]);

  return (
    <Spin spinning={isLoading}>
      <div className="d-flex justify-content-end mb-base">
        {renderRangeTimes()}
      </div>
      {/* <div
        className={cx(
          "d-flex",
          "justify-content-between",
          "align-items-center",
          "mb-base"
        )}
      >
        <div className={cx("text-16--bold")}>{t("PriceChart")}</div>
        <Select
          size="large"
          style={{ width: 100 }}
          placeholder={t("Duration")}
          options={durationOptions}
          defaultValue={durationOptions[0].value}
        />
      </div> */}
      <LineChart showDescription {...chartProps} />
    </Spin>
  );
};
