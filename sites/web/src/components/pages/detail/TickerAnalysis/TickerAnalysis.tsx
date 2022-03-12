import { Col, Row } from 'antd';
import React from 'react';
import { NewsList, ReportList } from 'src/components';
import { mockNews, mockReports } from 'src/mock';

interface TickerAnalysisProps {
  id: string;
}

export const TickerAnalysis: React.FC<TickerAnalysisProps> = ({}) => {
  return (
    <>
      <Row gutter={[32, 16]}>
        <Col md={14} xs={24}>
          <ReportList reports={mockReports} />
          {/* <FinancialInfoTable financialInfo={mockFinancialInfo} /> */}
        </Col>
        <Col md={10} xs={24}>
          <NewsList news={mockNews} />
        </Col>
      </Row>
    </>
  );
};
