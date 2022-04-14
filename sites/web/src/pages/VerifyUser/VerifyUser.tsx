import { authService, VerifyUserData } from '@smart-invest/common';
import { Button, Form, Input, notification } from 'antd';
import classNames from 'classnames/bind';
import { t } from 'i18next';
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Text } from 'src/components';
import { SIGNIN_PATH, SIGNUP_PATH } from 'src/constants';
import { useApp } from 'src/contexts';
import { useQuery } from 'src/hooks';

const cx = classNames.bind({});

export const VerifyUser: React.FC = () => {
  const { setLoading } = useApp();

  const history = useHistory();

  const query = useQuery();
  const email = query.get('email') || '';

  const [form] = Form.useForm<VerifyUserData>();

  const rules = {
    code: [
      {
        transform: (value: string) => value?.trim(),
        required: true,
        message: t('FieldRequired', { field: t('code').toLowerCase() }),
      },
      {
        transform: (value: string) => value?.trim(),
        maxLength: 6,
        message: t('FieldMaxLength', { field: t('Code'), maxLength: 6 }),
      },
    ],
  };

  const onFinish = async ({ code }: VerifyUserData) => {
    setLoading(true);

    const submitData: VerifyUserData = {
      code: code.trim(),
      email: email.trim(),
    };

    try {
      await authService.verifyUser(submitData);
      notification.success({ message: t('VerifySuccess') });
      history.push(SIGNIN_PATH);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        className={cx('w-100', 'm-auto')}
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <h2 className={cx('mb-32')}>{t('VerifyUser')}</h2>
        <Text level={2} className={cx('mb-16')}>
          {t('SendVerifyMail')}
        </Text>

        <Form.Item name="code" rules={rules.code} required={false}>
          <Input
            size="large"
            placeholder={t('EnterField', {
              field: t('Code').toLowerCase(),
            })}
          />
        </Form.Item>

        <Form.Item className={cx('text-right', 'mb-0')}>
          <Button type="primary" size="large" shape="round" htmlType="submit">
            {t('Confirm')}
          </Button>
        </Form.Item>
      </Form>
      <div className={cx('text-500', 'text-center')}>
        {t('NotHaveAccount')}{' '}
        <NavLink to={SIGNUP_PATH} className={cx('text-500', 'primary-color')}>
          {t('SignupNow')}
        </NavLink>
      </div>
    </>
  );
};
