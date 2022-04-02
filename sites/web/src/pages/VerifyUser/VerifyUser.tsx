import { authApi } from '@ah-ticker/common';
import { notification } from 'antd';
import classNames from 'classnames/bind';
import { t } from 'i18next';
import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { SIGNIN_PATH, SIGNUP_PATH } from 'src/constants';
import { useApp } from 'src/context';
import { useQuery } from 'src/hooks';

const cx = classNames.bind({});

export const VerifyUser: React.FC = () => {
  const query = useQuery();
  const history = useHistory();
  const { setLoading } = useApp();

  useEffect(() => {
    const onVerify = async () => {
      const email = query.get('email');
      const token = query.get('token');

      setLoading(true);

      try {
        await authApi.verifyUser({ email, token });
        notification.success({ message: t('VerifySuccess') });
        history.push(SIGNIN_PATH);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    onVerify();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h2 className={cx('m-auto')}>{t('VerifyUser')}</h2>
      <div className={cx('text-500', 'text-center')}>
        {t('NotHaveAccount')}{' '}
        <NavLink to={SIGNUP_PATH} className={cx('text-500', 'primary-color')}>
          {t('SignupNow')}
        </NavLink>
      </div>
    </>
  );
};
