import { Button, Spin } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { mockFavoriteLists } from 'src/mock';
import { FavoriteLists } from './components';

const cx = classNames.bind({});

export const WatchList: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Spin spinning={false}>
      <div className={cx('container')}>
        <div
          className={cx(
            'mb-32',
            'd-flex',
            'justify-content-between',
            'align-items-center',
          )}
        >
          <h2>{t('MyLibrary')}</h2>
          <Button size="large" type="primary">
            {t('CreateFavoriteList')}
          </Button>
        </div>
        <FavoriteLists favoriteLists={mockFavoriteLists} />
      </div>
    </Spin>
  );
};
