import { ArrowUpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import styles from './BackTop.module.scss';

const cx = classNames.bind(styles);

export const BackTop: React.FC = () => {
  const [visibleBackTop, setVisibleBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisibleBackTop(true);
      } else {
        setVisibleBackTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={cx('wrapper')}>
      {visibleBackTop && (
        <Button
          shape="circle"
          type="primary"
          icon={<ArrowUpOutlined style={{ fontSize: 18 }} />}
          onClick={scrollToTop}
        />
      )}
    </div>
  );
};
