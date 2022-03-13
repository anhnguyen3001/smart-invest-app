import { IComment } from '@ah-ticker/common';
import { Card, Comment, List } from 'antd';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { UserAvatar } from 'src/components';
import { mockComments } from 'src/mock';
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
        avatar={<UserAvatar shape="circle" user={user} />}
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
