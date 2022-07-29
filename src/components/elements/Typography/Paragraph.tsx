import { Typography } from 'antd';
import { ParagraphProps as AntdParagraphProps } from 'antd/lib/typography/Paragraph';
import classNames from 'classnames/bind';
import React from 'react';
import { getClassname, TypographyProps } from './common';
import './Typography.scss';

const cx = classNames.bind({});

type ParagraphProps = AntdParagraphProps & TypographyProps;

export const Paragraph: React.FC<ParagraphProps> = ({
  level,
  fontWeight,
  type,
  className,
  ...rest
}) => {
  return (
    <Typography.Paragraph
      className={cx([...getClassname({ level, fontWeight, type }), className])}
      {...rest}
    />
  );
};
