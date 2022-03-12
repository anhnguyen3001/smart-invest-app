import { Col, Row } from 'antd';
import React from 'react';
import { NewsList, ReportList } from 'src/components';
import { mockNews, mockReports } from 'src/mock';

interface TickerOverviewProps {
  onGoToAnalysisTab: () => void;
}

export const TickerOverview: React.FC<TickerOverviewProps> = ({
  onGoToAnalysisTab,
}) => {
  return (
    <>
      <Row gutter={[32, 16]}>
        <Col md={15} xs={24}>
          <ReportList reports={mockReports} onSeeMore={onGoToAnalysisTab} />
        </Col>
        <Col md={9} xs={24}>
          <NewsList news={mockNews} onSeeMore={onGoToAnalysisTab} />
        </Col>
      </Row>
    </>
  );
};
