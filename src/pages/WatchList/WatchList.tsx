import { Button, Spin } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mockFavoriteLists } from 'src/mock';
import { GetFavoriteListsParams } from 'src/types';
import { FavoriteLists } from './components';
import { useFavoriteLists } from './hooks';

export const WatchList: React.FC = () => {
  const { t } = useTranslation();
  const [params, setParams] = useState<GetFavoriteListsParams>({
    page: 1,
    pageSize: 20,
  });
  const { favoriteLists, pagination, loading } = useFavoriteLists(params);

  return (
    <Spin spinning={loading}>
      <div className="container">
        <div className="mb-32 d-flex justify-content-end">
          <Button size="large" type="primary">
            {t('CreateFavoriteList')}
          </Button>
        </div>
        <FavoriteLists favoriteLists={favoriteLists} pagination={pagination} />
      </div>
    </Spin>
  );
};
