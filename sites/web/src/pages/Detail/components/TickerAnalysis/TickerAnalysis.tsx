import { Col, Row } from 'antd';
import React from 'react';
import { FinStatementTable, NewsList } from 'src/components';
import { mockNews } from 'src/mock';

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
          <FinStatementTable companyId={companyId} />
        </Col>
        <Col md={10} xs={24}>
          <NewsList news={mockNews} />
        </Col>
      </Row>
    </>
  );
};
