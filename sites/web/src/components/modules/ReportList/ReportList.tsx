import { IFinancialStatement } from '@ah-ticker/common';
import { FilePdfTwoTone } from '@ant-design/icons';
import { Button, Card, Table, TableColumnProps } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Paragraph } from 'src/components';

interface ReportListProps {
  reports: IFinancialStatement[];
  onSeeMore?: () => void;
}

export const ReportList: React.FC<ReportListProps> = ({
  reports,
  onSeeMore,
}) => {
  const { t } = useTranslation();

  const renderTitle = () => {
    const title = (
      <Text level={1} fontWeight={700}>
        {t('FinancialStatements')}
      </Text>
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

  const columns: TableColumnProps<IFinancialStatement>[] = [
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
      title: t('Download'),
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
    <Card title={renderTitle()}>
      <Table
        rowKey="id"
        dataSource={reports}
        columns={columns}
        {...(onSeeMore && { pagination: false })}
      />
    </Card>
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
