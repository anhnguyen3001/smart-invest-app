import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { NewsList } from 'src/components';
import { useNews } from 'src/hooks';
import { GetNewsParams } from 'src/types';
import { FinancialStatementTable } from '../FinancialStatementTable';

interface TickerAnalysisProps {
  companyId: number;
}

export const TickerAnalysis: React.FC<TickerAnalysisProps> = ({
  companyId,
}) => {
  const [params, setParams] = useState<GetNewsParams>({ companyId, page: 1 });
  const { news, loading, pagination } = useNews(params);

  return (
    <>
      <Row gutter={[32, 16]}>
        <Col md={14} xs={24}>
          <FinancialStatementTable companyId={companyId} />
        </Col>
        <Col md={10} xs={24}>
          <NewsList
            showHeader
            loading={loading}
            news={news}
            pagination={pagination}
            onChangePagination={(page, pageSize) =>
              setParams((prev) => ({ ...prev, page, pageSize }))
            }
          />
        </Col>
      </Row>
    </>
  );
};
