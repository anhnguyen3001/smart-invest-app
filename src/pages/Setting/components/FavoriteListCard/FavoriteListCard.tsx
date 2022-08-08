import { FavoriteList } from 'src/types';
import { Button, Card, Dropdown, Menu, Tooltip } from 'antd';
import { Text } from 'src/components';
import { useTranslation } from 'react-i18next';
import { EditOutlined, MoreOutlined } from '@ant-design/icons';

interface FavoriteListCardProps {
  favoriteList: FavoriteList;
  onView: (favoriteList: FavoriteList) => void;
  onEdit: (favoriteList: FavoriteList) => void;
  onDelete: (id: number) => void;
}

export const FavoriteListCard: React.FC<FavoriteListCardProps> = ({
  favoriteList,
  onView,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const { id, name } = favoriteList;

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
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu onClick={(e) => e.domEvent.stopPropagation()}>
              <Menu.Item key="edit" onClick={() => onEdit(favoriteList)}>
                {t('Edit')}
              </Menu.Item>
              <Menu.Item
                className="danger-color"
                key="delete"
                onClick={() => onDelete(id)}
              >
                Xóa
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="text" onClick={(e) => e.stopPropagation()}>
            <MoreOutlined />
          </Button>
        </Dropdown>
      </div>
    </Card>
  );
};
