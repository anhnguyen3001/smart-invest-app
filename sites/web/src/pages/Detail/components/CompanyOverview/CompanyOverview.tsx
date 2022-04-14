import { ICompany } from '@smart-invest/common';
import { Col, Row } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import classNames from 'classnames/bind';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components';

const cx = classNames.bind({});

interface CompanyOverviewProps {
  company?: ICompany;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({
  company,
}) => {
  const { t } = useTranslation();

  const {
    companyName,
    introduction,
    firstClosePrice,
    firstSharesQuantity,
    firstTradingDate,
  } = company || {};

  const statistic = useMemo(() => {
    const content: { title: string; val?: number }[] = [
      { title: t('FirstSharesQuantity'), val: firstSharesQuantity },
      { title: t('FirstClosePrice'), val: firstClosePrice },
      { title: t('FirstTradingDate'), val: firstTradingDate },
    ];

    return (
      <Row gutter={[16, 16]}>
        {content.map(({ title, val }, index) => (
          <Col key={index} xs={12} md={8}>
            <Text className={cx('mb-4')} fontWeight={500} type="secondary">
              {title}
            </Text>
            <Text level={2} fontWeight={700}>
              {val}
            </Text>
          </Col>
        ))}
      </Row>
    );
    // eslint-disable-next-line
  }, [JSON.stringify(company)]);

  return (
    <>
      <h2 className={cx('mb-32', 'pb-16', 'border-bottom', 'primary-color')}>
        {t('About')} {companyName}
      </h2>
      <Paragraph
        className={cx('mb-32')}
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
