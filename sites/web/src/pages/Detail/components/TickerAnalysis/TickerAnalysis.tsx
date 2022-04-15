import {
  financialStatementService,
  GetFinancialStatementsReponse,
} from '@smart-invest/common';
import { Col, Row, Spin } from 'antd';
import React, { useState } from 'react';
import { NewsList, FinStatementTable } from 'src/components';
import { mockNews } from 'src/mock';
import useSWR from 'swr';

interface TickerAnalysisProps {
  companyId: number;
}

export const TickerAnalysis: React.FC<TickerAnalysisProps> = ({
  companyId,
}) => {
  const [year, setYear] = useState<number>();

  const { data, error } = useSWR<GetFinancialStatementsReponse>(
    ['financial-statements', companyId, year],
    async () => {
      if (!companyId) return;

      const res = await financialStatementService.getList({
        companyId,
        year,
      });
      return res;
    },
  );
  const isLoadingFinancialStaments = !data && !error;

  return (
    <>
      <Row gutter={[32, 16]}>
        <Col md={14} xs={24}>
          <Spin spinning={isLoadingFinancialStaments}>
            <FinStatementTable {...data} />
          </Spin>
        </Col>
        <Col md={10} xs={24}>
          <NewsList news={mockNews} />
        </Col>
      </Row>
    </>
  );
};
