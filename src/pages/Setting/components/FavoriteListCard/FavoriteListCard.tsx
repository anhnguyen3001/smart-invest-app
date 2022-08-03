import { FavoriteList } from 'src/types';
import { Card } from 'antd';
import { Text } from 'src/components';
import { useTranslation } from 'react-i18next';

interface FavoriteListCardProps {
  favoriteList: FavoriteList;
  onClick: (favoriteList: FavoriteList) => void;
}

export const FavoriteListCard: React.FC<FavoriteListCardProps> = ({
  favoriteList,
  onClick,
}) => {
  const { t } = useTranslation();
  const { id, name } = favoriteList;

  return (
    <Card
      className="cursor-pointer"
      size="small"
      onClick={() => onClick(favoriteList)}
    >
      <Text ellipsis level={1} fontWeight={700}>
        {name}
      </Text>
    </Card>
  );
};
