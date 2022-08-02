import { FavoriteList, Pagination as IPagination } from 'src/types';
import { Row, Col, Pagination, Empty } from 'antd';
import { FavoriteListCard } from '../FavoriteListCard';
import { convertPagination } from 'src/helpers';
import { useTranslation } from 'react-i18next';

interface FavoriteListsProps {
  setEdittedList: (list: FavoriteList) => void;
  favoriteLists?: FavoriteList[];
  pagination?: IPagination;
  onChangePagination?: (page: number, pageSize: number) => void;
}

export const FavoriteLists: React.FC<FavoriteListsProps> = ({
  setEdittedList,
  favoriteLists,
  pagination,
  onChangePagination,
}) => {
  const { t } = useTranslation();

  if (!favoriteLists?.length)
    return <Empty description={t('NotFoundFavoriteList')} />;
  return (
    <>
      <Row gutter={[16, 16]}>
        {favoriteLists.map((favoriteList) => (
          <Col key={favoriteList.id} xl={4} lg={6} md={8} sm={12}>
            <FavoriteListCard favoriteList={favoriteList} />
          </Col>
        ))}
      </Row>
      <Pagination
        {...convertPagination(pagination)}
        onChange={onChangePagination}
      />
    </>
  );
};
