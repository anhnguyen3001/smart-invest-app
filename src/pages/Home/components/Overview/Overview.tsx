import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './Overview.module.scss';

const cx = classNames.bind(styles);

export const OverView: React.FC = () => {
  return (
    <Row className={cx('wrapper')} justify="space-between" align="middle">
      <Col className={cx('left')} md={12}>
        Overview text
      </Col>
      <Col className={cx('right')} md={12}>
        Overview Image
      </Col>
    </Row>
  );
};
