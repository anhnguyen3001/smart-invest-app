import { Button, Spin } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FavoriteList, GetFavoriteListsParams, StyleProps } from 'src/types';
import { useFavoriteLists } from '../../hooks';
import { FavoriteListForm } from '../FavoriteListForm';
import { FavoriteLists } from '../FavoriteLists';

export const Library: React.FC<StyleProps> = ({ className }) => {
  const { t } = useTranslation();

  const [visibleModal, setVisibleModal] = useState(false);
  const [edittedList, setEditedList] = useState<FavoriteList>();

  const [params, setParams] = useState<GetFavoriteListsParams>({
    page: 1,
    pageSize: 20,
  });
  const { favoriteLists, pagination, loading, mutate } =
    useFavoriteLists(params);

  return (
    <>
      <Spin spinning={loading} className={className}>
        <div className="mb-32 d-flex justify-content-between">
          <h3>{t('FavoriteList')}</h3>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              setEditedList(undefined);
              setVisibleModal(true);
            }}
          >
            {t('CreateFavoriteList')}
          </Button>
        </div>
        <FavoriteLists
          setEdittedList={(list) => {
            setEditedList(list);
            setVisibleModal(true);
          }}
          favoriteLists={favoriteLists}
          pagination={pagination}
          onChangePagination={(page, pageSize) =>
            setParams((prev) => ({ ...prev, page, pageSize }))
          }
        />
      </Spin>
      <FavoriteListForm
        title={edittedList ? t('EditFavoriteList') : t('CreateFavoriteList')}
        visible={visibleModal}
        setVisible={setVisibleModal}
        favoriteList={edittedList}
        loading={loading}
        onAfterClose={mutate}
      />
    </>
  );
};
