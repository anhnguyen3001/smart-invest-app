import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { NewsList } from 'src/components';
import { RESEARCH_CENTER_PATH } from 'src/constants';
import { useNews } from 'src/hooks';
import { MarketTrend, WatchList } from './components';

const cx = classNames.bind({});

export const Home: React.FC = () => {
  const history = useHistory();

  const { news, loading } = useNews();

  const onChangePage = (link: string) => {
    history.push(link);
  };

  return (
    <div>
      <div className={cx('section-md')}>
        <WatchList />
      </div>

      <div className={cx('section-md')}>
        <Row gutter={[16, 16]}>
          <Col md={14} xs={24}>
            <MarketTrend />
          </Col>
          <Col md={10} xs={24}>
            <NewsList
              loading={loading}
              showHeader
              news={news}
              onSeeMore={() => onChangePage(RESEARCH_CENTER_PATH)}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
