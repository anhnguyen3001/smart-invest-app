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
      <h1 className={cx('mb-8', 'primary-color')}>{symbol}</h1>
      <h3 className={cx('mb-16', 'secondary-color')}>{companyName}</h3>

      <div
        className={cx(
          'd-flex',
          'align-items-center',
          'stock-price',
          priceColorClass && `${priceColorClass}-color`,
        )}
      >
        <h2>
          {isIncreasing ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
          {closePrice}
        </h2>
        <Text className={cx('ml-64')} type={priceColorClass}>
          {priceChange} ({percentChange}%)
        </Text>
      </div>

      <Text type="secondary" className="mt-8">
        {new Date(date).toLocaleString('vi')}
      </Text>
    </div>
  );
};
