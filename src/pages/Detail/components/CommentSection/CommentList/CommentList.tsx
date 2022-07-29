import { Comment as CommentInterface } from 'src/types';
import { Comment, Empty } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Text, UserAvatar } from 'src/components';
import { mockUser } from 'src/mock';
import styles from './CommentList.module.scss';
import { getDateFromTime } from 'src/helpers';

const cx = classNames.bind(styles);

interface CommentListProps {
  comments?: CommentInterface[];
  page: number;
  fetchNextPage: () => void;
  hasMore: boolean;
}

export const CommentList: React.FC<CommentListProps> = React.memo(
  ({ comments, hasMore, page, fetchNextPage }) => {
    const { t } = useTranslation();
    if (!comments?.length) {
      return <Empty description={t('NoComments')} />;
    }

    const renderList = () => {
      return comments.map(
        ({ commentId, user = mockUser, content, createdAt }) => {
          return (
            <Comment
              key={commentId}
              author={user.username}
              avatar={<UserAvatar shape="circle" user={user} />}
              content={<div dangerouslySetInnerHTML={{ __html: content }} />}
              datetime={getDateFromTime(createdAt)}
            />
          );
        },
      );
    };

    return (
      <div
        id="comment-area"
        className={cx(
          'flex-1',
          'd-flex',
          'flex-column-reverse',
          'wrapper',
          'mb-16',
          'pr-8',
        )}
      >
        <InfiniteScroll
          scrollableTarget="comment-area"
          className={cx('d-flex', 'flex-1', 'flex-column-reverse')}
          inverse
          dataLength={comments?.length || 0}
          hasMore={hasMore}
          next={fetchNextPage}
          loader={
            page > 1 && <h4 className={cx('text-center')}>{t('Loading')}</h4>
          }
          endMessage={
            <Text fontWeight={500} className={cx('text-center')}>
              {t('NoMoreComments')}
            </Text>
          }
        >
          <>{renderList()}</>
        </InfiniteScroll>
      </div>
    );
  },
);
