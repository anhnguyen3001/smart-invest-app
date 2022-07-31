import { FilePdfTwoTone } from '@ant-design/icons';
import { Button, Card, Select, Spin, Table, TableColumnProps } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph, Text } from 'src/components';
import { convertPagination } from 'src/helpers';
import { FinancialStatement, GetFinancialStatementParams } from 'src/types';
import { useFinancialStatements } from '../../hooks/useFinancialStatements';

const startYear = 2017;
const totalYears = new Date().getFullYear() - startYear + 1;
const yearOptions: number[] = Array.apply(0, new Array(totalYears)).map(
  (_, index: number) => startYear + index,
);

interface FinancialStatementTableProps {
  companyId?: number;
  onSeeMore?: () => void;
}

export const FinancialStatementTable: React.FC<
  FinancialStatementTableProps
> = ({ companyId, onSeeMore }) => {
  const { t } = useTranslation();

  const [params, setParams] = useState<GetFinancialStatementParams>({
    companyId: companyId || 0,
    page: 1,
  });

  const { financialStatements, loading, pagination } =
    useFinancialStatements(params);

  const renderTitle = () => {
    const title = (
      <div className="d-flex justify-content-between align-items-center">
        <Text level={1} fontWeight={700}>
          {t('FinancialStatements')}
        </Text>

        <Select
          placeholder={t('SelectYear')}
          style={{ minWidth: 130 }}
          allowClear
          options={yearOptions.map((year) => ({ label: year, value: year }))}
          onChange={(year) => setParams((prev) => ({ ...prev, year }))}
        />
      </div>
    );

    if (onSeeMore) {
      return (
        <div className="d-flex justify-content-between align-items-center">
          {title}
          {onSeeMore && (
            <Button
              className="pr-0"
              type="link"
              onClick={onSeeMore}
              size="small"
            >
              {t('SeeMore')}
            </Button>
          )}
        </div>
      );
    }

    return title;
  };

  const columns: TableColumnProps<FinancialStatement>[] = [
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => {
        return (
          <Paragraph fontWeight={500} ellipsis={{ rows: 2 }}>
            {name}
          </Paragraph>
        );
      },
    },
    {
      title: t('Period'),
      dataIndex: 'period',
      key: 'period',
      align: 'center' as const,
    },
    {
      title: t('View'),
      dataIndex: 'path',
      key: 'path',
      align: 'center' as const,
      render: (path: string) => {
        return (
          <a rel="noreferrer" target="_blank" href={path}>
            <FilePdfTwoTone style={{ fontSize: 24 }} />
          </a>
        );
      },
    },
  ];

  return (
    <Spin spinning={loading}>
      <Card title={renderTitle()}>
        <Table
          rowKey="id"
          dataSource={financialStatements}
          columns={columns}
          {...(onSeeMore && { pagination: false })}
          pagination={convertPagination(pagination)}
        />
      </Card>
    </Spin>
  );
};
