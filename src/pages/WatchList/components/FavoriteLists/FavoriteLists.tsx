import { FavoriteList, Pagination as IPagination } from 'src/types';
import { Row, Col, Pagination } from 'antd';
import { FavoriteListCard } from '../FavoriteListCard';
import { convertPagination } from 'src/helpers';

interface FavoriteListsProps {
  favoriteLists?: FavoriteList[];
  pagination?: IPagination;
}

export const FavoriteLists: React.FC<FavoriteListsProps> = ({
  favoriteLists,
  pagination,
}) => {
  if (!favoriteLists?.length) return null;
  return (
    <>
      <Row gutter={[16, 16]}>
        {favoriteLists.map((favoriteList) => (
          <Col key={favoriteList.id} xl={4} lg={6} md={8} sm={12}>
            <FavoriteListCard favoriteList={favoriteList} />
          </Col>
        ))}
      </Row>
      <Pagination {...convertPagination(pagination)} />
    </>
  );
};
