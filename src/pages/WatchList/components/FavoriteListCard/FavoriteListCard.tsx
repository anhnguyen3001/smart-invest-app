import { FavoriteList } from 'src/types';
import { Card } from 'antd';
import { Text } from 'src/components';
import { useTranslation } from 'react-i18next';

interface FavoriteListCardProps {
  favoriteList: FavoriteList;
}

export const FavoriteListCard: React.FC<FavoriteListCardProps> = ({
  favoriteList,
}) => {
  const { t } = useTranslation();
  const { imageUrl, name, user, createdAt } = favoriteList;
  return (
    <Card
      size="small"
      cover={
        <img
          style={{ height: 180, objectFit: 'cover' }}
          src={imageUrl}
          alt="favorite list ava"
        />
      }
    >
      <Text block ellipsis level={1} fontWeight={500} className="mt-8">
        {name}
      </Text>
      <Text className="mb-8">
        {t('By')} {user.username}
      </Text>
      <Text type="secondary">{createdAt}</Text>
    </Card>
  );
};
