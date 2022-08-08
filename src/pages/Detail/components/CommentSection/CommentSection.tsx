import { CommentOutlined } from '@ant-design/icons';
import { Button, Drawer, Spin } from 'antd';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useComments } from '../../hooks';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import styles from './CommentSection.module.scss';

const cx = classNames.bind(styles);

interface CommentSectionProps {
  companyId: number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  companyId,
}) => {
  const { t } = useTranslation();

  const { comments, page, fetchNextPage, hasMore, isLoading, refreshData } =
    useComments(companyId);

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Button
        className={cx('toggle', 'mb-8')}
        size="large"
        type="primary"
        shape="circle"
        icon={<CommentOutlined style={{ fontSize: 18 }} />}
        onClick={() => setVisible((prevState) => !prevState)}
      />

      <Spin spinning={isLoading}>
        <Drawer
          className={cx('drawer')}
          closable
          visible={visible}
          onClose={() => setVisible(false)}
          placement="right"
          title={t('Comments')}
          bodyStyle={{
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <CommentList
            comments={comments}
            page={page}
            fetchNextPage={fetchNextPage}
            hasMore={hasMore}
          />

          <CommentForm companyId={companyId} afterSubmit={refreshData} />
        </Drawer>
      </Spin>
    </>
  );
};
