import { FavoriteList } from 'src/types';
import { Button, Card, Tooltip } from 'antd';
import { Text } from 'src/components';
import { useTranslation } from 'react-i18next';
import { EditOutlined } from '@ant-design/icons';

interface FavoriteListCardProps {
  favoriteList: FavoriteList;
  onView: (favoriteList: FavoriteList) => void;
  onEdit: (favoriteList: FavoriteList) => void;
}

export const FavoriteListCard: React.FC<FavoriteListCardProps> = ({
  favoriteList,
  onView,
  onEdit,
}) => {
  const { t } = useTranslation();
  const { name } = favoriteList;

  return (
    <Card
      className="cursor-pointer"
      size="small"
      onClick={() => onView(favoriteList)}
    >
      <div className="d-flex align-items-center justify-content-between">
        <Text ellipsis level={2} fontWeight={700}>
          {name}
        </Text>
        <Button
          type="text"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(favoriteList);
          }}
        >
          <Tooltip title={t('Edit')}>
            <EditOutlined />
          </Tooltip>
        </Button>
      </div>
    </Card>
  );
};
