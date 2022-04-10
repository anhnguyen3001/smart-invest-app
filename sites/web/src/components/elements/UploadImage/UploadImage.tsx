import { imageService } from '@ah-ticker/common';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Avatar, Upload, UploadProps } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import classNames from 'classnames/bind';
import { t } from 'i18next';
import React, { useMemo } from 'react';
import { beforeUploadImg, getBase64 } from 'src/helpers';
import { Text } from '../Typography';
import styles from './UploadImage.module.scss';

const cx = classNames.bind(styles);

interface UploadImageProps extends UploadProps {
  fileList?: UploadFile[];
}

export const UploadImage: React.FC<UploadImageProps> = ({
  fileList,
  ...props
}) => {
  const content = useMemo(() => {
    let btnContent;
    if (fileList?.length) {
      btnContent = (
        <Avatar className={cx('w-100', 'h-100')} src={fileList[0].url} />
      );
    } else {
      btnContent = <CloudUploadOutlined style={{ fontSize: 24 }} />;
    }

    return (
      <>
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
      </>
    );
    // eslint-disable-next-line
  }, [JSON.stringify(fileList)]);

  const onUploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;

    getBase64(file, async (imageUrl) => {
      // console.log(imageUrl);
      try {
        const res = await imageService.upload(imageUrl);
        console.log(res);
        file.url = res.secure_url;
        onSuccess(file);
      } catch (e: any) {
        console.log(e);
        onError();
      }
    });
    console.log('file ', file);
  };

  return (
    <Upload
      customRequest={onUploadImage}
      accept="image/png, image/jpeg, image/jpg"
      beforeUpload={beforeUploadImg}
      fileList={fileList}
      {...props}
      showUploadList={false}
      maxCount={1}
    >
      {content}
    </Upload>
  );
};
