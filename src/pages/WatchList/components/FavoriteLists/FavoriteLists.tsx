import { FavoriteList } from 'src/types';
import { Row, Col } from 'antd';
import { FavoriteListCard } from '../FavoriteListCard';

interface FavoriteListsProps {
  favoriteLists: FavoriteList[];
}

export const FavoriteLists: React.FC<FavoriteListsProps> = ({
  favoriteLists,
}) => {
  if (!favoriteLists.length) return null;
  return (
    <Row gutter={[16, 16]}>
      {favoriteLists.map((favoriteList) => (
        <Col key={favoriteList.id} lg={6} md={8} sm={12}>
          <FavoriteListCard favoriteList={favoriteList} />
        </Col>
      ))}
    </Row>
  );
};
