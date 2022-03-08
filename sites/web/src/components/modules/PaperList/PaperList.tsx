import { IPaper } from '@ah-ticker/common';
import { Avatar, Button, List } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Paragraph } from 'src/components';

interface PaperListProps {
  papers?: IPaper[];
  onSeeMore?: () => void;
}

export const PaperList: React.FC<PaperListProps> = ({ papers, onSeeMore }) => {
  const { t } = useTranslation();

  if (!papers?.length) return null;

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

  const renderItem = ({
    id,
    title,
    link,
    description,
    image,
    date,
  }: IPaper) => {
    return (
      <List.Item key={id} className="justify-content-start align-items-start">
        <div>
          <Avatar alt="paper image" shape="square" size={48} src={image} />
        </div>
        <div className="ml-sm">
          <Text level={2} fontWeight={700} onClick={() => onOpenPaper(link)}>
            {title}
          </Text>
          <Paragraph
            ellipsis={{ rows: 3 }}
            type="secondary"
            className="mb-base"
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
      size="large"
      bordered
      header={renderHeader()}
      rowKey="id"
      dataSource={papers}
      renderItem={renderItem}
    />
  );
};
