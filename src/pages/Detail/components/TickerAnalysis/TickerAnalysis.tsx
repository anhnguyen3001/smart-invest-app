import { Col, Row } from 'antd';
import React from 'react';
import { FinancialStatementTable, NewsList } from 'src/components';
import { mockNews, mockPagination } from 'src/mock';

interface TickerAnalysisProps {
  companyId: number;
}

export const TickerAnalysis: React.FC<TickerAnalysisProps> = ({
  companyId,
}) => {
  return (
    <>
      <Row gutter={[32, 16]}>
        <Col md={14} xs={24}>
          <FinancialStatementTable companyId={companyId} />
        </Col>
        <Col md={10} xs={24}>
          <NewsList showHeader news={mockNews} pagination={mockPagination} />
        </Col>
      </Row>
    </>
  );
};
