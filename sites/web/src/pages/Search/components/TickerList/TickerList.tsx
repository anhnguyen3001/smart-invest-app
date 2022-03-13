import { ITicker } from '@ah-ticker/common';
import { Col, Row } from 'antd';
import React from 'react';
import { InfiniteList, InfiniteListProps, TickerCard } from 'src/components';

export interface TickerListProps extends Omit<InfiniteListProps, 'dataLength'> {
  tickers?: ITicker[];
}

export const TickerList: React.FC<TickerListProps> = ({ tickers, ...rest }) => {
  const renderItems = () => {
    return tickers?.map((ticker) => (
      <Col key={ticker.companyId} lg={6} md={8} sm={12} xs={24}>
        <TickerCard ticker={ticker} />
      </Col>
    ));
  };

  return (
    <InfiniteList dataLength={tickers?.length || 0} {...rest}>
      <Row gutter={[8, 16]} className="mb-16">
        {renderItems()}
      </Row>
    </InfiniteList>
  );
};
