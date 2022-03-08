import { Col, Row } from "antd";
import React from "react";
import { PaperList, ReportList } from "src/components";
import { mockPapers, mockReports } from "src/mock";

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
          <PaperList papers={mockPapers} onSeeMore={onGoToAnalysisTab} />
        </Col>
      </Row>
    </>
  );
};
