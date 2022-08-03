import { Button, Spin } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomLoading, Text } from 'src/components';
import { useApp } from 'src/contexts';
import { FavoriteList, GetFavoriteListsParams, StyleProps } from 'src/types';
import { useFavoriteLists } from '../../hooks';
import { AddTickerModal } from '../AddTickerModal';
import { FavoriteListForm } from '../FavoriteListForm';
import { FavoriteLists } from '../FavoriteLists';

export const Library: React.FC<StyleProps> = ({ className }) => {
  const { t } = useTranslation();

  const [visibleModal, setVisibleModal] = useState(false);
  const [edittedList, setEdittedList] = useState<FavoriteList>();

  const [params, setParams] = useState<GetFavoriteListsParams>({
    page: 1,
    pageSize: 20,
  });
  const { favoriteLists, pagination, loading, mutate } =
    useFavoriteLists(params);

  return (
    <>
      <CustomLoading loading={loading} className={className}>
        <div className="mb-32 d-flex justify-content-between">
          <h3>{t('FavoriteList')}</h3>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              setVisibleModal(true);
              setEdittedList(undefined);
            }}
          >
            {t('CreateFavoriteList')}
          </Button>
        </div>
        <FavoriteLists
          favoriteLists={favoriteLists}
          pagination={pagination}
          loading={loading}
          onChangePagination={(page, pageSize) =>
            setParams((prev) => ({ ...prev, page, pageSize }))
          }
          setEditList={(favoriteList) => {
            setEdittedList(favoriteList);
            setVisibleModal(true);
          }}
        />
      </CustomLoading>
      <FavoriteListForm
        title={edittedList ? t('EditFavoriteList') : t('CreateFavoriteList')}
        favoriteList={edittedList}
        visible={visibleModal}
        setVisible={setVisibleModal}
        loading={loading}
        onAfterClose={mutate}
      />
    </>
  );
};
