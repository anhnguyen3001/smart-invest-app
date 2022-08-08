import { Ticker } from 'src/types';
import { Button, Card, Divider, Tag, Tooltip } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Text, Paragraph } from 'src/components';
import { TICKERS_PATH } from 'src/constants';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind({});

export interface TickerCardProps {
  ticker?: Ticker;
  onAdd?: (id?: number) => void;
  onDelete?: (id?: number) => void;
}

export const TickerCard: React.FC<TickerCardProps> = React.memo(
  ({ ticker = {}, onAdd, onDelete }) => {
    const history = useHistory();
    const { t } = useTranslation();

    const {
      companyId,
      companyName,
      symbol,
      exchange,
      lastClosePrice,
      lastPercentChange,
      lastPriceChange,
    } = ticker as Ticker;

    const renderTitle = () => {
      if (onAdd || onDelete) {
        return (
          <>
            <div
              className={cx(
                'd-flex',
                'justify-content-between',
                'align-items-center',
                'mb-8',
              )}
            >
              <Tag color="pink" className={cx('text-500', 'text-4', 'mr-0')}>
                {exchange}
              </Tag>
              <Button
                type="text"
                onClick={() => {
                  onAdd?.(companyId) || onDelete?.(companyId);
                }}
              >
                {onAdd ? <PlusOutlined /> : <DeleteOutlined />}
              </Button>
            </div>
            <Text ellipsis level={2} fontWeight={700}>
              {symbol}
            </Text>
          </>
        );
      }
      return (
        <div
          className={cx(
            'd-flex',
            'justify-content-between',
            'align-items-center',
            'mb-8',
          )}
        >
          <Text ellipsis level={2} fontWeight={700}>
            {symbol}
          </Text>
          <Tag color="pink" className={cx('text-500', 'text-4', 'mr-0')}>
            {exchange}
          </Tag>
        </div>
      );
    };

    const renderPriceInfo = () => {
      const isNumberLastClosePrice = typeof lastClosePrice === 'number';
      const isNumberLastPercentChange = typeof lastPercentChange === 'number';
      const isNumberLastPriceChange = typeof lastPriceChange === 'number';

      if (
        !isNumberLastClosePrice &&
        !isNumberLastPercentChange &&
        !isNumberLastPriceChange
      ) {
        return null;
      }

      return (
        <>
          <Divider className={cx('my-8')} />
          {isNumberLastClosePrice && (
            <Text level={1} fontWeight={700} block={false}>
              {lastClosePrice}
            </Text>
          )}
          {isNumberLastPercentChange && isNumberLastPriceChange && (
            <Text
              type={(lastPercentChange || 0) > 0 ? 'success' : 'danger'}
              block={false}
              className={cx('ml-8')}
            >
              {lastPriceChange} ({lastPercentChange}%)
            </Text>
          )}
        </>
      );
    };

    const onGoToDetailTicker = () => {
      history.push(`${TICKERS_PATH}/${companyId}`);
    };

    return (
      <Card
        style={{ minHeight: '100%' }}
        className={cx('cursor-pointer')}
        onClick={!onAdd && !onDelete ? onGoToDetailTicker : undefined}
      >
        {renderTitle()}

        <Paragraph
          ellipsis={{ tooltip: companyName }}
          fontWeight={500}
          type="secondary"
          className={cx('mb-0')}
        >
          {companyName}
        </Paragraph>

        {renderPriceInfo()}
      </Card>
    );
  },
);
