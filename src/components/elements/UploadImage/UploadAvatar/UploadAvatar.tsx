import { CloudUploadOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '../../Typography';
import { UploadImageBase, UploadImageBaseProps } from '../UploadImageBase';
import styles from './UploadAvatar.module.scss';

const cx = classNames.bind(styles);

export const UploadAvatar: React.FC<UploadImageBaseProps> = ({
  fileList,
  ...props
}) => {
  const { t } = useTranslation();

  let btnContent;
  if (fileList?.length) {
    btnContent = (
      <Avatar className={cx('w-100', 'h-100')} src={fileList[0].url} />
    );
  } else {
    btnContent = <CloudUploadOutlined style={{ fontSize: 24 }} />;
  }

  return (
    <UploadImageBase {...props} fileList={fileList}>
      <div
        className={cx(
          'upload-btn',
          'd-flex',
          'align-items-center',
          'justify-content-center',
        )}
      >
        {btnContent}
      </div>
      <Text
        className={cx('mt-16', 'mb-24', 'cursor-pointer')}
        fontWeight={500}
        type="primary"
      >
        {t('ChangeAvatar')}
      </Text>
    </UploadImageBase>
  );
};
