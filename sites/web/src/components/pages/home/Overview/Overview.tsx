import { Col, Row } from "antd";
import classNames from "classnames/bind";
import React from "react";
import styles from "./Overview.module.scss";

const cx = classNames.bind(styles);

export const OverView: React.FC = () => {
  return (
    <Row
      className={cx("wrapper")}
      gutter={[64, 32]}
      justify="space-between"
      align="middle"
    >
      <Col md={12}>Overview text</Col>
      <Col md={12}>Overview Image</Col>
    </Row>
  );
};
