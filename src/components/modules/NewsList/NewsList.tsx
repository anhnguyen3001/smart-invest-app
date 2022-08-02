import { News, Pagination } from 'src/types';
import { Button, List, Spin } from 'antd';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Paragraph } from 'src/components';
import styles from './NewList.module.scss';
import { COLOR_THEME, THEME } from 'src/constants';
import { convertPagination } from 'src/helpers';
import { Link } from 'react-router-dom';
import { NewsModal } from '../NewsModal';

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
  const [selectedNews, setSelectedNews] = useState<News>();
  const { t } = useTranslation();

  if (!news?.length && !loading) return null;

  const onOpenNews = (news: News) => {
    if (!news.content) {
      setSelectedNews(news);
    } else window.open(news.path);
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

  const renderItem = (news: News) => {
    const { newsId, title, time } = news;
    return (
      <List.Item
        key={newsId}
        className={cx('align-items-start', 'px-8', 'item')}
      >
        <Text type="secondary">{new Date(time).toLocaleDateString('vi')}</Text>

        <Paragraph
          className="mb-0 cursor-pointer"
          style={{ width: '80%' }}
          fontWeight={500}
          ellipsis={{ rows: 2 }}
          onClick={() => onOpenNews(news)}
        >
          {title}
        </Paragraph>
      </List.Item>
    );
  };

  return (
    <>
      <Spin spinning={!!loading}>
        <List
          style={{
            backgroundColor: COLOR_THEME[THEME.DARK].bgComponent,
            borderRadius: 8,
          }}
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
      </Spin>
      <NewsModal
        news={selectedNews}
        visible={!!selectedNews}
        onClose={() => setSelectedNews(undefined)}
      />
    </>
  );
};
