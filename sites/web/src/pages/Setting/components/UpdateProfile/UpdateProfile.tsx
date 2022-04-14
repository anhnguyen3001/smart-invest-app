import {
  User,
  PATTERN_VALIDATION,
  UpdateProfileData,
  userService,
} from '@ah-ticker/common';
import { Button, Form, Input, notification } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UploadImage } from 'src/components';
import { useApp, useAuth } from 'src/contexts';
import { StyleProps } from 'src/types';
import styles from './UpdateProfile.module.scss';

const cx = classNames.bind(styles);

type FormField = Omit<User, 'id' | 'avatar'> & {
  avatar: Partial<UploadFile>[];
};

export const UpdateProfile: React.FC<StyleProps> = ({ className }) => {
  const { t } = useTranslation();

  const { setLoading } = useApp();

  const { user } = useAuth();
  const { avatar, email, username } = user || {};

  const [form] = Form.useForm<FormField>();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        avatar: avatar
          ? [
              {
                url: avatar,
              },
            ]
          : [],
        email,
        username,
      });
    }
    // eslint-disable-next-line
  }, [JSON.stringify(user)]);

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
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = async (inputValue: FormField) => {
    setLoading(true);

    const submitData: UpdateProfileData = {
      username: inputValue.username?.trim(),
      avatar: inputValue.avatar[0]?.url || null,
    };

    try {
      await userService.updateProfile(submitData);

      notification.success({ message: t('UpdateSuccess') });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      className={className}
      layout="vertical"
      form={form}
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
