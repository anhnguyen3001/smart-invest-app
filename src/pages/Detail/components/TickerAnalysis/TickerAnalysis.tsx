import { Card, Col, Collapse, Row } from 'antd';
import { t } from 'i18next';
import React, { useState } from 'react';
import { CustomLoading, NewsList, Text } from 'src/components';
import { useNews } from 'src/hooks';
import { GetNewsParams } from 'src/types';
import { useFinancialIndexes } from '../../hooks';
import { FinancialStatementTable } from '../FinancialStatementTable';

const { Panel } = Collapse;

interface TickerAnalysisProps {
  companyId: number;
}

export const TickerAnalysis: React.FC<TickerAnalysisProps> = ({
  companyId,
}) => {
  const [params, setParams] = useState<GetNewsParams>({ companyId, page: 1 });
  const { news, loading, pagination } = useNews(params);
  const { cookedFinancialIndexes, loading: financialIndexLoading } =
    useFinancialIndexes({
      companyId,
    });

  const renderFinancialIndexes = () => {
    return (
      <Card
        className="mb-16"
        title={
          <Text level={1} fontWeight={700}>
            {t('FinancialIndexes')}
          </Text>
        }
      >
        <CustomLoading loading={financialIndexLoading}>
          <Collapse accordion>
            {Object.entries(cookedFinancialIndexes || {}).map(
              ([year, values]) => {
                return (
                  <>
                    <Panel key={year} header={year}>
                      {Object.entries(values).map(([index, val]) => (
                        <div className="mb-8">
                          <Text
                            level={2}
                            fontWeight={500}
                            type="primary"
                            block={false}
                          >
                            {t(index)}
                          </Text>
                          :{' '}
                          <Text level={2} block={false}>
                            {val as string}
                          </Text>
                        </div>
                      ))}
                    </Panel>
                  </>
                );
              },
            )}
          </Collapse>
        </CustomLoading>
      </Card>
    );
  };

  return (
    <>
      <Row gutter={[32, 16]}>
        <Col md={14} xs={24}>
          {renderFinancialIndexes()}
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
