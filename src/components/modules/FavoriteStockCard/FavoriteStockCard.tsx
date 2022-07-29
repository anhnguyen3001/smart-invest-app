import { Ticker } from 'src/types';
import { Card } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { TICKERS_PATH } from 'src/constants';
import { Text } from 'src/components/elements';

const cx = classNames.bind({});

interface FavoriteStockCardProps {
  ticker?: Ticker;
  style?: React.CSSProperties;
}

export const FavoriteStockCard: React.FC<FavoriteStockCardProps> = ({
  ticker,
  style,
}) => {
  const histtory = useHistory();
  const { symbol, lastClosePrice, lastPercentChange } = ticker || {};

  return (
    <Card style={style}>
      <h3 onClick={() => histtory.push(`${TICKERS_PATH}/abc`)}>{symbol}</h3>
      <div className={cx('mb-16')}>
        <Text level={2} className={cx('d-inline', 'mr-8')}>
          {lastClosePrice}
        </Text>
        <Text className={cx('d-inline')}>({lastPercentChange}%)</Text>
      </div>
      {/* <PriceLineChart
        labels={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
        prices={[86, 114, 106, 106, 107, 200, 105, 106, 90, 200]}
      /> */}
    </Card>
  );
};
