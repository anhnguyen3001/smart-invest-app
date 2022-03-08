import { Avatar, Card, List, Comment } from 'antd';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { mockComments } from 'src/mock';
import { IComment } from 'src/types';
import useSWR from 'swr';

interface CommentSectionProps {
  name: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ name }) => {
  const { t } = useTranslation();
  const { data } = useSWR(['comments', name], async () => {
    return mockComments;
  });

  const renderItem = useCallback(({ id, user, content, date }: IComment) => {
    return (
      <Comment
        key={id}
        author={user.name}
        avatar={<Avatar shape="circle" src={user.avatar} />}
        content={<div dangerouslySetInnerHTML={{ __html: content }} />}
        datetime={new Date(date).toLocaleString()}
      />
    );
  }, []);

  return (
    <Card title={t('Comments')}>
      <List id="id" dataSource={data} renderItem={renderItem} />
    </Card>
  );
};
