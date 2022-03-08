import { SearchOutlined } from "@ant-design/icons";
import { Input, InputProps } from "antd";
import classnames from "classnames/bind";
import React from "react";
import styles from "./InputSearch.module.scss";

const cx = classnames.bind(styles);

interface InputSearchProps extends InputProps {}

export const InputSearch: React.FC<InputSearchProps> = ({
  className,
  ...rest
}) => {
  return (
    <Input
      className={cx("search", className, "px-base")}
      size="large"
      prefix={<SearchOutlined />}
      {...rest}
    />
  );
};
