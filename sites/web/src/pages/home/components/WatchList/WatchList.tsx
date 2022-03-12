import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FavoriteStockCard } from 'src/components';
import { WATCH_LIST_PATH } from 'src/constants';
import { mockTickers } from 'src/mock';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './WatchList.module.scss';

SwiperCore.use([Navigation]);

const cx = classNames.bind(styles);

interface WatchListProps {}

export const WatchList: React.FC<WatchListProps> = ({}) => {
  const tickers = mockTickers;

  const { t } = useTranslation();

  return (
    <>
      <div className={cx('d-flex', 'justify-content-between', 'mb-16')}>
        <div className={cx('d-flex', 'align-items-center')}>
          <h2>{t('YourWatchList')}</h2>
          <NavLink to={WATCH_LIST_PATH} className={cx('ml-8', 'd-flex')}>
            <RightOutlined />
          </NavLink>
        </div>
        <div>
          <Button
            className={cx('mx-8', 'watch-list__prev')}
            icon={<ArrowLeftOutlined />}
            type="link"
          />
          <Button
            className={cx('watch-list__next')}
            icon={<ArrowRightOutlined />}
            type="link"
          />
        </div>
      </div>
      <Swiper
        navigation={{
          prevEl: '.watch-list__prev',
          nextEl: '.watch-list__next',
        }}
        key="watchlist-swiper"
        spaceBetween={16}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          400: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 6,
          },
        }}
      >
        {tickers?.map((ticker) => (
          <SwiperSlide key={ticker.companyId}>
            <FavoriteStockCard ticker={ticker} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
