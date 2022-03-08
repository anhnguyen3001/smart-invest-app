import { Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components';
import { ITicker } from '@ah-ticker/common';

interface RankingTableProps {
  stocks?: ITicker[];
}

export const RankingTable: React.FC<RankingTableProps> = ({ stocks }) => {
  const { t } = useTranslation();
  if (!stocks?.length) return null;

  const columns = [
    {
      title: t('Stock'),
      dataIndex: 'name',
      key: 'name',
      render: (name: string, { companyName }: ITicker) => {
        return (
          <>
            <Text level={2}>{name}</Text>
            <Text type="secondary">{companyName}</Text>
          </>
        );
      },
    },
    // {
    //   title: t("Price"),
    //   dataIndex: "openPrice",
    //   key: "openPrice",
    //   align: "center" as const,
    //   render: (openPrice: number, { percentChange }: ITicker) => {
    //     return (
    //       <>
    //         {openPrice} (
    //         <span
    //           className={cx([
    //             {
    //               "green-color": percentChange > 0,
    //               "red-color": percentChange < 0,
    //             },
    //           ])}
    //         >
    //           {percentChange}%
    //         </span>
    //         )
    //       </>
    //     );
    //   },
    // },
    {
      title: t('TotalVolume'),
      dataIndex: 'totalVolume',
      key: 'totalVolume',
      align: 'center' as const,
    },
    {
      title: t('TotalValue'),
      dataIndex: 'totalValue',
      key: 'totalValue',
      align: 'center' as const,
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={stocks}
      columns={columns}
      pagination={false}
    />
  );
};
