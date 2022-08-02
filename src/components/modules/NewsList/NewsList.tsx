import { News, Pagination } from 'src/types';
import { Button, List } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Paragraph } from 'src/components';
import styles from './NewList.module.scss';
import { COLOR_THEME, THEME } from 'src/constants';
import { convertPagination } from 'src/helpers';

const cx = classNames.bind(styles);

export interface NewsListProps {
  news?: News[];
  pagination?: Pagination;
  loading?: boolean;
  onSeeMore?: () => void;
  showHeader?: boolean;
  size?: 'large' | 'default';
  onChangePagination?: (page: number, pageSize: number) => void;
}

export const NewsList: React.FC<NewsListProps> = ({
  size = 'default',
  news,
  loading,
  onSeeMore,
  showHeader = false,
  pagination,
  onChangePagination,
}) => {
  const { t } = useTranslation();

  if (!news?.length) return null;

  const onOpenNews = (link: string) => {
    window.open(link);
  };

  const renderHeader = () => {
    const title = (
      <Text level={1} fontWeight={700}>
        {t('News')}
      </Text>
    );

    if (onSeeMore) {
      return (
        <div className="d-flex justify-content-between align-items-center">
          {title}
          <Button className="pr-0" type="link" onClick={onSeeMore} size="small">
            {t('ViewMore')}
          </Button>
        </div>
      );
    }

    return title;
  };

  const renderItem = ({ newsId, title, path, time }: News) => {
    return (
      <List.Item
        key={newsId}
        className={cx('justify-content-space-between', 'align-items-center')}
      >
        <Text type="secondary">{new Date(time).toLocaleDateString('vi')}</Text>

        <div style={{ width: '80%' }}>
          <Paragraph
            className={cx('mb-4', 'ms-1')}
            fontWeight={500}
            ellipsis={{ rows: 2 }}
            onClick={() => onOpenNews(path)}
          >
            {title}
          </Paragraph>
        </div>
      </List.Item>
    );
  };

  return (
    <List
      style={{ backgroundColor: COLOR_THEME[THEME.DARK].bgComponent }}
      loading={loading}
      className={cx(`news--${size}`)}
      size="large"
      {...(size === 'default' && { bordered: true })}
      header={showHeader ? renderHeader() : undefined}
      rowKey="newsId"
      dataSource={news}
      renderItem={renderItem}
      {...(pagination && {
        pagination: {
          ...convertPagination(pagination),
          onChange: onChangePagination,
        },
      })}
    />
  );
};
