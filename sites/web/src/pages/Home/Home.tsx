import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { NewsList } from 'src/components';
import { RESEARCH_CENTER_PATH } from 'src/constants';
import { mockNews } from 'src/mock';
import { MarketTrend, OverView, WatchList } from './components';

const cx = classNames.bind({});

export const Home: React.FC = () => {
  const history = useHistory();

  const onChangePage = (link: string) => {
    history.push(link);
  };

  return (
    <div>
      <OverView />

      <div className={cx('section-md')}>
        <WatchList />
      </div>

      <div className={cx('section-md')}>
        <MarketTrend />
      </div>

      <Row className={cx('section-md')} gutter={[16, 16]}>
        <Col md={12} xs={24}>
          <NewsList
            news={mockNews}
            onSeeMore={() => onChangePage(RESEARCH_CENTER_PATH)}
          />
        </Col>
        <Col md={12} xs={24}>
          <NewsList
            news={mockNews}
            onSeeMore={() => onChangePage(RESEARCH_CENTER_PATH)}
          />
        </Col>
      </Row>
    </div>
  );
};
