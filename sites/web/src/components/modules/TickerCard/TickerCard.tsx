import { Ticker } from '@smart-invest/common';
import { Avatar, Card, Tag } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Text } from 'src/components';
import { TICKERS_PATH } from 'src/constants';

const cx = classNames.bind({});

interface TickerCardProps {
  ticker?: Ticker;
}

export const TickerCard: React.FC<TickerCardProps> = ({ ticker = {} }) => {
  const history = useHistory();

  const {
    companyId,
    companyName,
    symbol,
    exchange,
    lastClosePrice,
    lastPercentChange,
    lastPriceChange,
  } = ticker as Ticker;

  const onGoToDetailTicker = () => {
    history.push(`${TICKERS_PATH}/${ticker?.companyId}`);
  };

  return (
    <Card className={cx('cursor-pointer')} onClick={onGoToDetailTicker}>
      <div className={cx('d-flex')}>
        <Avatar
          shape="square"
          size={36}
          src="https://sota.finance/images/Logo.svg"
        />
        <div className={cx('ml-16', 'flex-1')}>
          <div
            className={cx(
              'd-flex',
              'justify-content-between',
              'align-items-start',
            )}
          >
            <Text level={2} fontWeight={700}>
              {symbol}
            </Text>
            <Tag color="warning" className={cx('text-500', 'text-4')}>
              {exchange}
            </Tag>
          </div>

          <Text ellipsis level={4} type="secondary">
            {ticker?.companyName}
          </Text>

          <div className={cx('mt-8', 'pt-8', 'border-top')}>
            <Text level={1} fontWeight={700} block={false}>
              {lastClosePrice}
            </Text>
            <Text
              type={(lastPercentChange || 0) > 0 ? 'success' : 'success'}
              block={false}
              className={cx('ml-8')}
            >
              {lastPriceChange} ({lastPercentChange}%)
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};
