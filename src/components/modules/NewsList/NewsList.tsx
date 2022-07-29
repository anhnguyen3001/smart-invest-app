import { News, Pagination } from 'src/types';
import { Button, List } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Paragraph } from 'src/components';
import styles from './NewList.module.scss';

const cx = classNames.bind(styles);

export interface NewsListProps {
  news?: News[];
  pagination?: Pagination;
  onSeeMore?: () => void;
  showHeader?: boolean;
  size?: 'large' | 'default';
}

export const NewsList: React.FC<NewsListProps> = ({
  size = 'default',
  news,
  onSeeMore,
  showHeader = false,
  pagination,
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
          {onSeeMore && (
            <Button
              className="pr-0"
              type="link"
              onClick={onSeeMore}
              size="small"
            >
              {t('ViewMore')}
            </Button>
          )}
        </div>
      );
    }

    return title;
  };

  const renderItem = ({ id, title, path, time }: News) => {
    return (
      <List.Item
        key={id}
        className={cx('justify-content-space-between', 'align-items-center')}
      >
        <Text type="secondary">{new Date(time).toLocaleDateString()}</Text>

        <div style={{ width: '80%' }}>
          <Paragraph
            className={cx('mb-4', 'ms-1')}
            // level={2}
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
      className={cx(`news--${size}`)}
      size="large"
      {...(size === 'default' && { bordered: true })}
      header={showHeader ? renderHeader() : undefined}
      rowKey="id"
      dataSource={news}
      renderItem={renderItem}
      {...(pagination && {
        pagination: {
          current: pagination?.currentPage,
          pageSize: pagination?.pageSize,
          total: pagination?.totalItems,
        },
      })}
    />
  );
};
