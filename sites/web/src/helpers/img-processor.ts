import { notification, Upload } from 'antd';
import { t } from 'i18next';

export const getBase64 = (img: Blob, callback: (value: any) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ALLOWED_IMG_TYPES = ['png', 'jpg', 'jpeg'];
const MAX_IMG_SIZE = 2;

export const beforeUploadImg = (file: File) => {
  const fileType = file.type.split('/')[1];
  const typeIsAllowed = ALLOWED_IMG_TYPES.includes(fileType);

  if (!typeIsAllowed) {
    notification.error({
      message: t('ImgTypeIsNotAllowed', {
        imgTypes: ALLOWED_IMG_TYPES.join('/'),
      }),
    });

    return Upload.LIST_IGNORE;
  }

  const fileSize = file.size / 1024 / 1024;

  if (fileSize > MAX_IMG_SIZE) {
    notification.error({
      message: t('ImgIsTooHeavy', {
        imgSize: `${MAX_IMG_SIZE}MB`,
      }),
    });

    return Upload.LIST_IGNORE;
  }
};
