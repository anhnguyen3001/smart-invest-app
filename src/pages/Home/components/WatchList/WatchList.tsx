import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { TickerCard } from 'src/components';
import { WATCH_LIST_PATH } from 'src/constants';
import { mockTickers } from 'src/mock';

export const WatchList: React.FC = () => {
  const tickers = mockTickers;

  const { t } = useTranslation();

  return (
    <>
      <div className="d-flex justify-content-between mb-16">
        <div className="d-flex align-items-center">
          <h3>{t('YourWatchList')}</h3>
          <NavLink to={WATCH_LIST_PATH} className="ml-8 d-flex">
            <RightOutlined />
          </NavLink>
        </div>
        <div>
          <Button
            className="mx-8 watch-list__prev"
            icon={<ArrowLeftOutlined />}
            type="link"
          />
          <Button
            className="watch-list__next"
            icon={<ArrowRightOutlined />}
            type="link"
          />
        </div>
      </div>

      <Splide
        key="watchlist-swiper"
        options={{
          rewind: true,
          gap: '1rem',
          lazyLoad: true,
          pagination: false,
          perPage: 5,
          breakpoints: {
            400: {
              perPage: 1,
            },
            576: {
              perPage: 2,
            },
            769: {
              perPage: 3,
            },
            992: {
              perPage: 4,
            },
          },
        }}
      >
        {tickers?.map((ticker) => (
          <SplideSlide key={ticker.companyId}>
            <TickerCard ticker={ticker} />
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
};
