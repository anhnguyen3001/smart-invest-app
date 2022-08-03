import { Company } from 'src/types';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Tag, Text } from 'src/components';
import { getPriceColor } from 'src/helpers';
import styles from './TickerInfo.module.scss';
import { Button, Col, Row } from 'antd';
import { t } from 'i18next';
import { PredictedModal } from '../PredictedModal/PredictedModal';

const cx = classNames.bind(styles);

interface TickerInfoProps {
  company?: Company;
  className?: string;
}

export const TickerInfo: React.FC<TickerInfoProps> = ({
  company,
  className,
}) => {
  const [visibleModal, setVisibleModal] = useState(false);

  if (!company) return null;
  const {
    name,
    symbol,
    major,
    exchange,

    // openPrice,
    // closePrice,
    // ceilingPrice,
    // floorPrice,
    // percentChange,
    // priceChange,
    // date,
  } = company;

  // const isIncreasing = percentChange > 0;
  // const priceColorClass = getPriceColor({
  //   price: closePrice,
  //   openPrice,
  //   ceilingPrice,
  //   floorPrice,
  // });

  return (
    <div className={cx('wrapper', className)}>
      <div className={cx('d-flex', 'flex-wrap', 'mb-24')}>
        {/* <TagItem text={major} type="secondary" />
        <TagItem text={exchange} type="secondary" /> */}
        <Tag className="mr-16" text={major} />
        <Tag text={exchange} />
        {/* <Text fontWeight={500} className={cx('tag', 'mr-16', 'py-8', 'px-16')}>
          {major}
        </Text>
        <Text fontWeight={500} className={cx('tag', 'py-8', 'px-16')}>
          {exchange}
        </Text> */}
      </div>

      <Row justify="space-between">
        <Col>
          <h1 className={cx('mb-8', 'primary-color')}>{symbol}</h1>
          <h3 className={cx('mb-16', 'secondary-color')}>{name}</h3>
        </Col>
        <Col>
          <Button type="primary" onClick={() => setVisibleModal(true)}>
            {t('GetPredictedPrice')}
          </Button>
        </Col>
      </Row>
      <PredictedModal
        symbol={symbol}
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
      />

      {/* <div
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
      </Text> */}
    </div>
  );
};
