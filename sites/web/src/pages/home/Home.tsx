import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { MarketTrend, OverView, PaperList, WatchList } from 'src/components';
import { ANALYTICS_PATH } from 'src/constants';
import { mockPapers } from 'src/mock';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

export const Home: React.FC = () => {
  const history = useHistory();

  const onChangePage = (link: string) => {
    history.push(link);
  };

  return (
    <>
      <OverView />
      <div className={cx('section-wrapper')}>
        <WatchList />
      </div>

      <div className={cx('section-wrapper')}>
        <MarketTrend />
      </div>

      <Row className={cx('section-wrapper')} gutter={[16, 16]}>
        <Col md={12} xs={24}>
          <PaperList
            papers={mockPapers}
            onSeeMore={() => onChangePage(ANALYTICS_PATH)}
          />
        </Col>
        <Col md={12} xs={24}>
          <PaperList
            papers={mockPapers}
            onSeeMore={() => onChangePage(ANALYTICS_PATH)}
          />
        </Col>
      </Row>
    </>
  );
};
