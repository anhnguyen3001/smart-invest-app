import { imageService } from '@ah-ticker/common';
import { Upload, UploadProps } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import React from 'react';
import { beforeUploadImg, getBase64 } from 'src/helpers';

export interface UploadImageBaseProps extends UploadProps {
  fileList?: UploadFile[];
}

export const UploadImageBase: React.FC<UploadImageBaseProps> = ({
  fileList,
  children,
  ...props
}) => {
  const onUploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;

    getBase64(file, async (imageUrl) => {
      try {
        const res = await imageService.upload(imageUrl);
        file.url = res.secure_url;
        onSuccess(file);
      } catch (e: any) {
        console.log(e);
        onError();
      }
    });
  };

  return (
    <Upload
      customRequest={onUploadImage}
      accept="image/png, image/jpeg, image/jpg"
      beforeUpload={beforeUploadImg}
      fileList={fileList}
      {...props}
    >
      {children}
    </Upload>
  );
};
