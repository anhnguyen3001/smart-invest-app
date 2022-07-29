import { FilePdfTwoTone } from '@ant-design/icons';
import { Button, Card, Select, Spin, Table, TableColumnProps } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { financialStatementService } from 'src/api';
import { Text, Paragraph } from 'src/components';
import { convertPagination } from 'src/helpers';
import { mockFinancialStatements } from 'src/mock';
import { FinancialStatement, GetFinancialStatementsReponse } from 'src/types';
import useSWR from 'swr';

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

  const [year, setYear] = useState<number>();

  const { data, error } = useSWR<GetFinancialStatementsReponse | undefined>(
    ['financial-statements', companyId, year],
    async () => {
      if (!companyId) return;

      const res = await financialStatementService.getList({
        companyId,
        year,
      });
      return res;
      // return res;
    },
  );
  const isLoadingFinancialStaments = !data && !error;

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
          defaultValue={year}
          options={yearOptions.map((year) => ({ label: year, value: year }))}
          onChange={setYear}
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
    <Spin spinning={isLoadingFinancialStaments}>
      <Card title={renderTitle()}>
        <Table
          rowKey="id"
          dataSource={mockFinancialStatements}
          columns={columns}
          {...(onSeeMore && { pagination: false })}
          pagination={convertPagination(data?.pagination)}
        />
      </Card>
    </Spin>
  );
  // const tableProps: TableProps<FinancialInfoRecord> = useMemo(() => {
  //   const { date } = financialInfo;
  //   const convertedInfo = getFinancialInfoRecords(financialInfo);

  //   return {
  //     columns: [
  //       { key: "name", dataIndex: "name" },
  //       ...date.map((value: string, index) => {
  //         return {
  //           key: value,
  //           title: value,
  //           dataIndex: "",
  //         };
  //       }),
  //     ],
  //     dataSource: convertedInfo,
  //   };
  // }, [JSON.stringify(financialInfo)]);

  // return <Table rowKey="name" {...tableProps} />;
};

// interface FinancialInfoRecord {
//   name: string;
//   data: number[];
// }

// const getFinancialInfoRecords = (
//   info: IFinancialInfo
// ): FinancialInfoRecord[] => {
//   const { date, ...restInfo } = info;
//   const res: FinancialInfoRecord[] = [];

//   Object.entries(restInfo).forEach(([name, data]) => {
//     res.push({ name, data: data as number[] });
//   });

//   return res;
// };
