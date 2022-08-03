import { ConvertedTickerPrice } from 'src/types';
import { Card } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components';
import { getPriceColor } from 'src/helpers/ticker';
import styles from './ExchangeSummary.module.scss';

const cx = classNames.bind(styles);

interface ExchangeSummaryProps {
  tickerPrice?: ConvertedTickerPrice;
}

export const ExchangeSummary: React.FC<ExchangeSummaryProps> = ({
  tickerPrice,
}) => {
  const { t } = useTranslation();

  const {
    openPrice,
    ceilingPrice,
    closePrice,
    floorPrice,
    minPrice,
    maxPrice,
    totalValue,
  } = tickerPrice || {};
  console.log(ceilingPrice == floorPrice);
  const handleGetColor = (price?: number) => {
    return `${getPriceColor({
      price,
      openPrice,
      ceilingPrice,
      floorPrice,
    })}-color`;
  };

  const displayTexts: { title: string; value?: number; colorClass?: string }[] =
    [
      {
        title: t('TotalValue'),
        value: totalValue,
      },
      {
        title: t('CeilingPrice'),
        value: ceilingPrice,
        colorClass: handleGetColor(ceilingPrice),
      },
      {
        title: t('FloorPrice'),
        value: floorPrice,
        colorClass: handleGetColor(floorPrice),
      },
      {
        title: t('OpenPrice'),
        value: openPrice,
        colorClass: handleGetColor(openPrice),
      },
      {
        title: t('ClosePrice'),
        value: closePrice,
        colorClass: handleGetColor(closePrice),
      },
      {
        title: t('MinPrice'),
        value: minPrice,
        colorClass: handleGetColor(minPrice),
      },
      {
        title: t('MaxPrice'),
        value: maxPrice,
        colorClass: handleGetColor(maxPrice),
      },
    ];

  return (
    <Card
      className={cx('h-100')}
      bodyStyle={{
        padding: '1.14rem 2.3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      {displayTexts.map(({ title, value, colorClass }, index) => (
        <div
          key={index}
          className={cx(
            'd-flex',
            'justify-content-between',
            'align-items-center',
            { 'mb-8': index !== displayTexts.length - 1 },
          )}
        >
          <Text level={2} fontWeight={500}>
            {title}
          </Text>
          <Text className={colorClass} level={1} fontWeight={700}>
            {value || 'N/A'}
          </Text>
        </div>
      ))}
    </Card>
  );
};
