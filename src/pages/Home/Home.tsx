import { Col, Row } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { NewsList } from 'src/components';
import { NEWS_PATH } from 'src/constants';
import { useNews } from 'src/hooks';
import { MarketTrend, WatchList } from './components';

export const Home: React.FC = () => {
  const history = useHistory();

  const { news, loading } = useNews();

  return (
    <div>
      <div className="section-md">
        <WatchList />
      </div>

      <div className="section-md">
        <Row gutter={[16, 16]}>
          <Col md={14} xs={24}>
            <MarketTrend />
          </Col>
          <Col md={10} xs={24}>
            <NewsList
              loading={loading}
              showHeader
              news={news}
              onSeeMore={() => history.push(NEWS_PATH)}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
