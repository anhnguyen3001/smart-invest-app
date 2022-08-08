import { Pagination as PaginationInterface, Ticker } from 'src/types';
import { Col, Empty, Pagination, Row, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { TickerCard, TickerCardProps } from 'src/components';
import { convertPagination } from 'src/helpers';

const pageSizeOptions = [10, 20, 50];

export interface TickerListProps
  extends Pick<TickerCardProps, 'onAdd' | 'onDelete'> {
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
  ...rest
}) => {
  const { t } = useTranslation();

  const renderItems = () => {
    return tickers?.map((ticker, index) => (
      <Col key={index} xxl={6} md={8} sm={12} xs={24}>
        <TickerCard ticker={ticker} {...rest} />
      </Col>
    ));
  };

  return (
    <Spin spinning={loading}>
      {!tickers?.length && !loading ? (
        <Empty
          style={{ minHeight: 200 }}
          className="d-flex flex-column justify-content-center"
          description={t('NotFoundTickers')}
        />
      ) : (
        <>
          <Row gutter={[16, 16]} className="mb-16">
            {renderItems()}
          </Row>
          <Pagination
            className="ml-auto mt-auto"
            style={{ width: 'fit-content' }}
            {...convertPagination(pagination)}
            onChange={onChangePagination}
            pageSizeOptions={pageSizeOptions}
          />
        </>
      )}
    </Spin>
  );
};
