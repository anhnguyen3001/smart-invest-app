import { authApi } from '@ah-ticker/common';
import { FacebookFilled } from '@ant-design/icons';
import classNames from 'classnames/bind';
import React from 'react';
import ReactFacebookLogin from 'react-facebook-login';
import { useTranslation } from 'react-i18next';
import { useApp, useAuth } from 'src/context';
import { StyleProps } from 'src/types';
import styles from './FacebookButton.module.scss';

const cx = classNames.bind(styles);

export const FacebookButton: React.FC<StyleProps> = ({className}) => {
  const { t } = useTranslation();
  const { setLoading } = useApp();

  const { updateToken } = useAuth();

  const responseFacebook = async (response: any) => {
    if (response.accessToken) {
      setLoading(true);
      try {
        const res = await authApi.loginFB(response.accessToken as string);
        updateToken(res);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ReactFacebookLogin
      appId={process.env.REACT_APP_FB_APP_ID || ''}
      callback={responseFacebook}
      icon={<FacebookFilled style={{ fontSize: 24, marginRight: 8 }} />}
      cssClass={cx('button')}
      textButton={t('SigninWithFacebook')}
    />
  );
};
