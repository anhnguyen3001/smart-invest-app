import { FavoriteList, Pagination as IPagination } from 'src/types';
import { Row, Col, Pagination, Empty } from 'antd';
import { FavoriteListCard } from '../FavoriteListCard';
import { convertPagination } from 'src/helpers';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { DetailFavoriteListModal } from '../DetailFavoriteListModal';
import { CustomLoading } from 'src/components';

interface FavoriteListsProps {
  favoriteLists?: FavoriteList[];
  pagination?: IPagination;
  onChangePagination?: (page: number, pageSize: number) => void;
  loading?: boolean;
  setEditList: (list: FavoriteList) => void;
  onDelete: (id: number) => void;
}

export const FavoriteLists: React.FC<FavoriteListsProps> = ({
  favoriteLists,
  pagination,
  onChangePagination,
  loading,
  setEditList,
  onDelete,
}) => {
  const { t } = useTranslation();

  const [detailList, setDetailList] = useState<FavoriteList>();

  if (!favoriteLists?.length && !loading)
    return <Empty description={t('NotFoundFavoriteList')} />;
  return (
    <CustomLoading loading={loading}>
      <Row gutter={[16, 16]}>
        {favoriteLists?.map((favoriteList) => (
          <Col key={favoriteList.id} xl={4} lg={6} md={8} sm={12}>
            <FavoriteListCard
              favoriteList={favoriteList}
              onView={setDetailList}
              onEdit={setEditList}
              onDelete={onDelete}
            />
          </Col>
        ))}
      </Row>
      <Pagination
        className="ml-auto mt-16"
        {...convertPagination(pagination)}
        onChange={onChangePagination}
      />
      <DetailFavoriteListModal
        visible={!!detailList}
        onClose={() => setDetailList(undefined)}
        favoriteList={detailList}
      />
    </CustomLoading>
  );
};
