import { Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components';
import { thousandFormatter } from 'src/helpers';
import { TickerPrice } from 'src/types';

interface TradingDataTableProps {
  prices?: TickerPrice[];
}

export const TradingDataTable: React.FC<TradingDataTableProps> = ({
  prices,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: (data: any) => {
        return t('Date');
      },
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString('vi'),
    },
    {
      title: t('Change'),
      dataIndex: 'priceChange',
      key: 'priceChange',
      render: (priceChange: number, record: TickerPrice) => {
        return (
          <div>
            {thousandFormatter(priceChange)} ({record.percentChange}%)
          </div>
        );
      },
    },
    {
      title: t('OpenPrice'),
      dataIndex: 'openPrice',
      key: 'openPrice',
      align: 'center' as const,
      render: (openPrice: number) => thousandFormatter(openPrice),
    },
    {
      title: t('MinPrice'),
      dataIndex: 'minPrice',
      key: 'minPrice',
      align: 'center' as const,
      render: (minPrice: number) => thousandFormatter(minPrice),
    },
    {
      title: t('MaxPrice'),
      dataIndex: 'maxPrice',
      key: 'maxPrice',
      align: 'center' as const,
      render: (maxPrice: number) => thousandFormatter(maxPrice),
    },
    {
      title: t('ClosePrice'),
      dataIndex: 'closePrice',
      key: 'closePrice',
      align: 'center' as const,
      render: (closePrice: number) => thousandFormatter(closePrice),
    },
    {
      title: t('TotalValue'),
      dataIndex: 'totalValue',
      key: 'totalValue',
      align: 'center' as const,
      render: (totalValue: number) => thousandFormatter(totalValue),
    },
  ];

  return (
    <>
      <Text
        italic
        type="secondary"
        className="ml-auto mb-8"
        style={{ width: 'fit-content' }}
      >
        {t('Unit')}: {t('dong')}
      </Text>
      <Table
        rowKey="date"
        dataSource={prices}
        columns={columns}
        size="large"
        scroll={{
          x: 'max-content',
        }}
      />
    </>
  );
};
