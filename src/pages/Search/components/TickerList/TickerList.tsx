import { Pagination as PaginationInterface, Ticker } from 'src/types';
import { Col, Empty, Pagination, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { TickerCard } from 'src/components';
import { convertPagination } from 'src/helpers';

const pageSizeOptions = [10, 20, 50];

export interface TickerListProps {
  tickers?: Ticker[];
  pagination?: PaginationInterface;
  onChangePagination?: (page: number, pageSize: number) => void;
  loading?: boolean;
}

export const TickerList: React.FC<TickerListProps> = ({
  tickers,
  pagination,
  onChangePagination,
  loading,
}) => {
  const { t } = useTranslation();

  if (!tickers?.length && !loading) {
    return <Empty description={t('NotFoundTickers')} />;
  }

  const renderItems = () => {
    return tickers?.map((ticker, index) => (
      <Col key={index} xxl={6} lg={8} xs={24}>
        <TickerCard ticker={ticker} />
      </Col>
    ));
  };

  return (
    <>
      <Row gutter={[16, 16]} className="mb-16">
        {renderItems()}
      </Row>
      <Pagination
        className="ml-auto"
        style={{ width: 'fit-content' }}
        {...convertPagination(pagination)}
        onChange={onChangePagination}
        pageSizeOptions={pageSizeOptions}
      />
    </>
  );
};
