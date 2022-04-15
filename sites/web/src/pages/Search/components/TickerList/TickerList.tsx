import { Ticker } from '@smart-invest/common';
import { Col, Row } from 'antd';
import React from 'react';
import { InfiniteList, InfiniteListProps, TickerCard } from 'src/components';

export interface TickerListProps extends Omit<InfiniteListProps, 'dataLength'> {
  tickers?: Ticker[];
}

export const TickerList: React.FC<TickerListProps> = ({ tickers, ...rest }) => {
  const renderItems = () => {
    return tickers?.map((ticker, index) => (
      <Col key={index} xxl={6} lg={8} xs={24}>
        <TickerCard ticker={ticker} />
      </Col>
    ));
  };

  return (
    <InfiniteList dataLength={tickers?.length || 0} {...rest}>
      <Row gutter={[16, 16]} className="mb-16">
        {renderItems()}
      </Row>
    </InfiniteList>
  );
};
