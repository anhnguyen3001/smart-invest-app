import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { NewsList } from 'src/components';
import { RESEARCH_CENTER_PATH } from 'src/constants';
import { mockNews } from 'src/mock';
import { MarketTrend, WatchList } from './components';

const cx = classNames.bind({});

export const Home: React.FC = () => {
  const history = useHistory();
  console.log('home');
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
          <Col md={16} xs={24}>
            <MarketTrend />
          </Col>
          <Col md={8} xs={24}>
            <NewsList
              showHeader
              news={mockNews}
              onSeeMore={() => onChangePage(RESEARCH_CENTER_PATH)}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
