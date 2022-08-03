import { Button, Spin } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from 'src/contexts';
import { FavoriteList, GetFavoriteListsParams, StyleProps } from 'src/types';
import { useFavoriteLists } from '../../hooks';
import { FavoriteListForm } from '../FavoriteListForm';
import { FavoriteLists } from '../FavoriteLists';

export const Library: React.FC<StyleProps> = ({ className }) => {
  const { loading: appLoading } = useApp();
  const { t } = useTranslation();

  const [visibleModal, setVisibleModal] = useState(false);

  const [params, setParams] = useState<GetFavoriteListsParams>({
    page: 1,
    pageSize: 20,
  });
  const { favoriteLists, pagination, loading, mutate } =
    useFavoriteLists(params);

  return (
    <>
      <Spin spinning={!appLoading && loading} className={className}>
        <div className="mb-32 d-flex justify-content-between">
          <h3>{t('FavoriteList')}</h3>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              setVisibleModal(true);
            }}
          >
            {t('CreateFavoriteList')}
          </Button>
        </div>
        <FavoriteLists
          favoriteLists={favoriteLists}
          pagination={pagination}
          onChangePagination={(page, pageSize) =>
            setParams((prev) => ({ ...prev, page, pageSize }))
          }
        />
      </Spin>
      <FavoriteListForm
        title={t('CreateFavoriteList')}
        visible={visibleModal}
        setVisible={setVisibleModal}
        loading={loading}
        onAfterClose={mutate}
      />
    </>
  );
};
