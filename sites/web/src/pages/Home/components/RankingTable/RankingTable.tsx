import { Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components';
import { Ticker } from '@smart-invest/common';
import classNames from 'classnames/bind';
import { ColumnsType } from 'antd/lib/table';

const cx = classNames.bind({});

interface RankingTableProps {
  tickers?: Ticker[];
}

export const RankingTable: React.FC<RankingTableProps> = ({ tickers }) => {
  const { t } = useTranslation();
  if (!tickers?.length) return null;

  const columns: ColumnsType<Ticker> = [
    {
      title: t('Ticker'),
      dataIndex: 'name',
      key: 'name',
      render: (name: string, { companyName }: Ticker) => {
        return (
          <>
            <Text level={2}>{name}</Text>
            <Text type="secondary">{companyName}</Text>
          </>
        );
      },
    },
    {
      title: t('Price'),
      dataIndex: 'openPrice',
      key: 'openPrice',
      align: 'center',
      render: (openPrice: number, { lastPercentChange }: Ticker) => {
        return (
          <>
            {openPrice} (
            <span
              className={cx([
                {
                  'success-color': lastPercentChange > 0,
                  'error-color': lastPercentChange < 0,
                },
              ])}
            >
              {lastPercentChange}%
            </span>
            )
          </>
        );
      },
    },
    {
      title: t('TotalVolume'),
      dataIndex: 'totalVolume',
      key: 'totalVolume',
      align: 'center',
    },
    {
      title: t('TotalValue'),
      dataIndex: 'totalValue',
      key: 'totalValue',
      align: 'center',
    },
  ];

  return (
    <Table
      rowKey="companyId"
      dataSource={tickers}
      columns={columns}
      pagination={false}
    />
  );
};
