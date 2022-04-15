import { INews, Pagination } from '@smart-invest/common';
import { Button, List } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Paragraph } from 'src/components';
import styles from './NewList.module.scss';

const cx = classNames.bind(styles);

export interface NewsListProps {
  news?: INews[];
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

  const onOpenPaper = (link: string) => {
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
              {t('SeeMore')}
            </Button>
          )}
        </div>
      );
    }

    return title;
  };

  const renderItem = ({ id, title, link, description, image, date }: INews) => {
    const itemProps: { titleRow: number; descriptionRow: number } =
      size === 'default'
        ? { titleRow: 1, descriptionRow: 2 }
        : { titleRow: 3, descriptionRow: 3 };

    return (
      <List.Item
        key={id}
        className={cx('justify-content-start', 'align-items-start')}
      >
        <div className={cx('metaImage-wrapper')}>
          <img alt="news metaImage" src={image} />
        </div>
        <div className={cx('ml-32')}>
          <Paragraph
            className={cx('mb-4')}
            level={2}
            fontWeight={700}
            ellipsis={{ rows: itemProps.titleRow }}
            onClick={() => onOpenPaper(link)}
          >
            {title}
          </Paragraph>
          <Paragraph
            className={cx('mb-16')}
            ellipsis={{ rows: itemProps.descriptionRow }}
            type="secondary"
          >
            {description}
          </Paragraph>
          <Text level={4} type="secondary">
            {new Date(date).toLocaleString('vi')}
          </Text>
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
      pagination={pagination}
    />
  );
};
