import { Company, formatNumber } from '@smart-invest/common';
import { Col, Row } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import classNames from 'classnames/bind';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components';

const cx = classNames.bind({});

interface CompanyOverviewProps {
  company?: Company;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({
  company = {},
}) => {
  const { t } = useTranslation();

  const {
    name,
    introduction,
    firstClosePrice,
    firstSharesQuantity,
    firstTradingDate,
    marketCap,
    listedShares,
    outstandingShares,
    eps,
    dilutedEps,
    pe,
    bvps,
  } = company as Company;

  const statistic = useMemo(() => {
    const firstTimeData: {
      title: string;
      value?: number | string;
    }[] = [
      {
        title: t('FirstSharesQuantity'),
        value: formatNumber(firstSharesQuantity),
      },
      { title: t('FirstClosePrice'), value: formatNumber(firstClosePrice) },
      {
        title: t('FirstTradingDate'),
        value: new Date(firstTradingDate).toLocaleString(),
      },
      {
        title: t('MarketCap'),
        value: formatNumber(marketCap),
      },
      { title: t('ListedShares'), value: formatNumber(listedShares) },
      { title: t('OutStandingShares'), value: formatNumber(outstandingShares) },
      {
        title: t('Eps'),
        value: formatNumber(eps),
      },
      { title: t('DilutedEps'), value: formatNumber(dilutedEps) },
      { title: t('PE'), value: formatNumber(pe) },
      { title: t('BookValuePerShare'), value: formatNumber(bvps) },
    ];

    return (
      <Row gutter={[16, 16]}>
        {firstTimeData.map(({ title, value }, index) => (
          <Col key={index} xs={12} md={8}>
            <Text className={cx('mb-4')} fontWeight={500} type="secondary">
              {title}
            </Text>
            <Text ellipsis level={2} fontWeight={700}>
              {value}
            </Text>
          </Col>
        ))}
      </Row>
    );
    // eslint-disable-next-line
  }, [JSON.stringify(company)]);

  return (
    <>
      <h2 className={cx('mb-16', 'pb-16', 'border-bottom', 'primary-color')}>
        {t('About')} {name}
      </h2>
      <Paragraph
        className={cx('mb-16')}
        ellipsis={{
          rows: 2,
          expandable: true,
          symbol: t('ShowMore'),
        }}
      >
        {introduction}
      </Paragraph>
      {/* <Text lines={isShorted ? 2 : undefined}>{introduction} </Text> */}
      {statistic}
    </>
  );
};
