import React from 'react';
import { IUser, PATTERN_VALIDATION } from '@ah-ticker/common';
import { useTranslation } from 'react-i18next';
import { useForm } from 'antd/lib/form/Form';
import { Button, Form, Input } from 'antd';
import { useAuth } from 'src/context';
import { UploadImage } from 'src/components';
import { UploadFile } from 'antd/lib/upload/interface';
import classNames from 'classnames/bind';
import styles from './UpdateProfile.module.scss';
import { StyleProps } from 'src/types';

const cx = classNames.bind(styles);

type FormField = Omit<IUser, 'id' | 'avatar'> & {
  avatar: Partial<UploadFile>[];
};

export const UpdateProfile: React.FC<StyleProps> = ({ className }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { avatar, email, gender, phoneNumber, username } = user || {};

  const [form] = useForm<FormField>();

  const initialValues: Partial<FormField> = {
    avatar: avatar
      ? [
          {
            url: avatar,
          },
        ]
      : [],
    email,
    gender,
    phoneNumber,
    username,
  };

  const rules = {
    username: [
      {
        transform: (value: string) => value?.trim(),
        required: true,
        message: t('FieldRequired', { field: t('OldPassword').toLowerCase() }),
      },
    ],
    phoneNumber: [
      {
        validator: async (_: any, value: string) => {
          value = value?.trim() || '';

          if (value && !PATTERN_VALIDATION.phone.test(value)) {
            return Promise.reject(
              t('ErrorFormat', { field: t('PhoneNumber') }),
            );
          }

          return Promise.resolve(value);
        },
      },
    ],
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = (data: FormField) => {};

  return (
    <Form
      className={className}
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item
        className={cx('mb-0')}
        name="avatar"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <UploadImage className={cx('avatar')} />
      </Form.Item>

      <Form.Item
        name="username"
        label={t('Username')}
        rules={rules.username}
        required={false}
      >
        <Input
          size="large"
          placeholder={t('EnterField', {
            field: t('Username').toLowerCase(),
          })}
        />
      </Form.Item>

      <Form.Item name="email" label={t('Email')}>
        <Input size="large" readOnly />
      </Form.Item>

      <Form.Item
        className={cx('mb-24')}
        name="phoneNumber"
        label={t('PhoneNumber')}
        rules={rules.phoneNumber}
      >
        <Input
          size="large"
          placeholder={t('EnterField', {
            field: t('PhoneNumber').toLowerCase(),
          })}
        />
      </Form.Item>

      <Button
        className={cx('submit-btn')}
        type="primary"
        size="large"
        shape="round"
        htmlType="submit"
      >
        {t('Save')}
      </Button>
    </Form>
  );
};
