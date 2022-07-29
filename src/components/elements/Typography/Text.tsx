import { Typography } from 'antd';
import { TextProps as AntdTextProps } from 'antd/lib/typography/Text';
import classNames from 'classnames/bind';
import React from 'react';
import { getClassname, TypographyProps } from './common';
import './Typography.scss';

const cx = classNames.bind({});

type TextProps = Omit<AntdTextProps, 'type'> &
  TypographyProps & {
    block?: boolean;
  };

export const Text: React.FC<TextProps> = ({
  level,
  fontWeight,
  type,
  className,
  block = true,
  ...rest
}) => {
  return (
    <Typography.Text
      className={cx([
        ...getClassname({ level, fontWeight, type }),
        className,
        { 'd-block': block },
      ])}
      {...rest}
    />
  );
};
