import { Button, notification } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { favoriteListService } from 'src/api/services/favoriteList';
import { CustomLoading } from 'src/components';
import { FavoriteList, GetFavoriteListsParams, StyleProps } from 'src/types';
import { useFavoriteLists } from '../../hooks';
import { FavoriteListForm } from '../FavoriteListForm';
import { FavoriteLists } from '../FavoriteLists';

export const Library: React.FC<StyleProps> = ({ className }) => {
  const { t } = useTranslation();

  const [visibleModal, setVisibleModal] = useState(false);
  const [edittedList, setEdittedList] = useState<FavoriteList>();

  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState<GetFavoriteListsParams>({
    page: 1,
    pageSize: 20,
  });
  const {
    favoriteLists,
    pagination,
    loading: favoriteListLoading,
    mutate,
  } = useFavoriteLists(params);

  const onDelete = async (id: number) => {
    setLoading(true);
    try {
      await favoriteListService.deleteList(id);
      notification.success({ message: t('DeleteSuccessfully') });
      mutate();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomLoading
        loading={loading || favoriteListLoading}
        className={className}
      >
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
          loading={favoriteListLoading}
          onChangePagination={(page, pageSize) =>
            setParams((prev) => ({ ...prev, page, pageSize }))
          }
          setEditList={(favoriteList) => {
            setEdittedList(favoriteList);
            setVisibleModal(true);
          }}
          onDelete={onDelete}
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
