import React from 'react';
import ReactGoogleLogin from 'react-google-login';
import { useTranslation } from 'react-i18next';
import { authService } from 'src/api';
import { useApp, useAuth } from 'src/contexts';
import { getEnv } from 'src/helpers';

export const GoogleButton: React.FC = () => {
  const { t } = useTranslation();

  const { setLoading } = useApp();
  const { updateToken } = useAuth();

  const responseGoogle = async (response: any) => {
    if (response.accessToken) {
      setLoading(true);
      try {
        const res = await authService.loginGoogle(
          response.accessToken as string,
        );
        updateToken(res);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ReactGoogleLogin
      clientId={getEnv('GOOGLE_CLIENT_ID')}
      onSuccess={responseGoogle}
      buttonText={t('SigninWithGoogle')}
    />
  );
};
