import { Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'src/components';
import { Ticker } from 'src/types';
import classNames from 'classnames/bind';
import { ColumnsType } from 'antd/lib/table';
import { useHistory } from 'react-router-dom';
import { DETAIL_PATH } from 'src/constants';

const cx = classNames.bind({});

interface RankingTableProps {
  tickers?: Ticker[];
}

export const RankingTable: React.FC<RankingTableProps> = ({ tickers }) => {
  const history = useHistory();
  const { t } = useTranslation();
  if (!tickers?.length) return null;

  const columns: ColumnsType<Ticker> = [
    {
      title: t('Ticker'),
      dataIndex: 'symbol',
      key: 'symbol',
      render: (symbol: string, { companyName }: Ticker) => {
        return (
          <>
            <Text level={2}>{symbol}</Text>
            <Text type="secondary">{companyName}</Text>
          </>
        );
      },
    },
    {
      title: t('ClosePrice'),
      dataIndex: 'lastClosePrice',
      key: 'lastClosePrice',
      align: 'center',
    },
    {
      title: t('PercentChange'),
      dataIndex: 'lastPercentChange',
      key: 'lastPercentChange',
      align: 'center',
      render: (lastPercentChange: number) => {
        return (
          <span
            className={cx([
              {
                'success-color': lastPercentChange > 0,
                'danger-color': lastPercentChange < 0,
              },
            ])}
          >
            {lastPercentChange}%
          </span>
        );
      },
    },
    {
      title: t('PriceChange'),
      dataIndex: 'lastPriceChange',
      key: 'lastPriceChange',
      align: 'center',
      render: (lastPriceChange: number) => {
        return (
          <span
            className={cx([
              {
                'success-color': lastPriceChange > 0,
                'danger-color': lastPriceChange < 0,
              },
            ])}
          >
            {lastPriceChange}
          </span>
        );
      },
    },
  ];

  return (
    <Table
      rowKey="companyId"
      dataSource={tickers}
      columns={columns}
      pagination={false}
      onRow={(row) => ({
        className: 'cursor-pointer',
        onClick: () =>
          history.push(DETAIL_PATH.replace(':companyId', `${row.companyId}`)),
      })}
    />
  );
};
