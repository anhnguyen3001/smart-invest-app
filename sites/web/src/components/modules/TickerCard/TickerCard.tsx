import { ITicker } from '@smart-invest/common';
import { Avatar, Card, Tag } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Text } from 'src/components';
import { STOCKS_PATH } from 'src/constants';

const cx = classNames.bind({});

interface TickerCardProps {
  ticker?: ITicker;
}

export const TickerCard: React.FC<TickerCardProps> = ({ ticker }) => {
  const history = useHistory();

  const onGoToDetailTicker = () => {
    history.push(`${STOCKS_PATH}/${ticker?.companyId}`);
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
              {ticker?.symbol}
            </Text>
            <Tag color="warning" className={cx('text-500', 'text-4')}>
              {ticker?.exchange}
            </Tag>
          </div>

          <Text ellipsis level={4} type="secondary">
            {ticker?.companyName}
          </Text>

          <div className={cx('mt-8', 'pt-8', 'border-top')}>
            <Text level={1} fontWeight={700} block={false}>
              {ticker?.openPrice}
            </Text>
            <Text
              type={(ticker?.percentChange || 0) > 0 ? 'success' : 'success'}
              block={false}
              className={cx('ml-8')}
            >
              {ticker?.priceChange} ({ticker?.percentChange}%)
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};
