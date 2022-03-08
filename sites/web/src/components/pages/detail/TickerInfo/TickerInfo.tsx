import { ConvertedTicker } from '@ah-ticker/common';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import React from 'react';
import { Text } from 'src/components';
import { getPriceColor } from 'src/helpers';
import styles from './TickerInfo.module.scss';

const cx = classNames.bind(styles);

interface TickerInfoProps {
  ticker?: ConvertedTicker;
}

export const TickerInfo: React.FC<TickerInfoProps> = ({ ticker }) => {
  if (!ticker) return null;
  const {
    companyName,
    symbol,
    openPrice,
    closePrice,
    ceilingPrice,
    floorPrice,
    percentChange,
    priceChange,
    date,
  } = ticker;

  const isIncreasing = percentChange > 0;
  const priceColorClass = getPriceColor({
    price: closePrice,
    openPrice,
    ceilingPrice,
    floorPrice,
  });

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('mb-half', 'primary-color')}>{symbol}</h1>
      <h3 className={cx('mb-base', 'secondary-color')}>{companyName}</h3>

      <div
        className={cx(
          'd-flex',
          'align-items-center',
          'stock-price',
          `${priceColorClass}-color`,
        )}
      >
        <h2>
          {isIncreasing ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
          {closePrice}
        </h2>
        <Text className={cx('ml-base')}>
          {priceChange} ({percentChange}%)
        </Text>
      </div>

      <Text color="secondary" className="mt-half">
        {new Date(date).toLocaleString('vi')}
      </Text>
    </div>
  );
};
