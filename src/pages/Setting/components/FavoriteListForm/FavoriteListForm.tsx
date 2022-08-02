import { Form, Input, Modal, notification, Spin } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import classnames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { favoriteListService } from 'src/api/services/favoriteList';
import { FavoriteList, UpsertFavoriteListRequest } from 'src/types';

export interface FavoriteListFormProps {
  title: string;
  favoriteList?: FavoriteList;
  loading?: boolean;
  visible: boolean;
  setVisible: (val: boolean) => void;
  onAfterClose?: () => any;
}

export const FavoriteListForm: React.FC<FavoriteListFormProps> = ({
  favoriteList,
  loading = false,
  onAfterClose,
  visible,
  setVisible,
  title,
}: FavoriteListFormProps) => {
  const { t } = useTranslation();
  const [loadingInternal, setLoadingInternal] = useState(false);
  const [form] = Form.useForm<UpsertFavoriteListRequest>();

  const handleSubmitForm = async (values: UpsertFavoriteListRequest) => {
    const body = {
      ...values,
      name: values?.name?.trim(),
    };
    try {
      setLoadingInternal(true);
      if (favoriteList?.id) {
        await favoriteListService.updateList(favoriteList.id, body);
        notification.success({ message: t('UpdateSuccessfully') });
      } else {
        await favoriteListService.createList(body);
        notification.success({ message: t('CreateSuccessfully') });
      }
      setVisible(false);
      form.resetFields();
      if (onAfterClose) onAfterClose();
    } finally {
      setLoadingInternal(false);
    }
  };

  const rules = {
    name: [
      {
        required: true,
        message: t('FieldRequired', { field: t('Name') }),
      },
    ],
  };

  useEffect(() => {
    if (visible) {
      if (favoriteList) {
        form.setFieldsValue(favoriteList);
      }
    }
    // eslint-disable-next-line
  }, [JSON.stringify(favoriteList), visible]);

  return (
    <Modal
      title={title}
      visible={visible}
      okText={t('Save')}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
      destroyOnClose
      okButtonProps={{ loading: loadingInternal, disabled: loading }}
    >
      <Spin spinning={loading || loadingInternal}>
        <Form form={form} layout="vertical" onFinish={handleSubmitForm}>
          <Form.Item
            label={t('Name')}
            name="name"
            rules={rules.name}
            className="mb-0"
          >
            <Input size="large" placeholder={t('Name')} />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
