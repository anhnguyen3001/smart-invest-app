import { ITicker } from '@ah-ticker/common';
import { Card } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { STOCKS_PATH } from 'src/constants';

const cx = classNames.bind({});

interface FavoriteStockCardProps {
  ticker?: ITicker;
  style?: React.CSSProperties;
}

export const FavoriteStockCard: React.FC<FavoriteStockCardProps> = ({
  ticker,
  style,
}) => {
  const histtory = useHistory();
  const { symbol } = ticker || {};

  return (
    <Card style={style}>
      <h3 onClick={() => histtory.push(`${STOCKS_PATH}/abc`)}>{symbol}</h3>
      <div className={cx('mb-16')}>
        {/* <Text level={2} className={cx("d-inline", "mr-8")}>
          {openPrice}
        </Text>
        <Text className={cx("d-inline")}>({percentChange}%)</Text> */}
      </div>
      {/* <PriceLineChart
        labels={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
        prices={[86, 114, 106, 106, 107, 200, 105, 106, 90, 200]}
      /> */}
    </Card>
  );
};
