import { IUser, userApi } from '@ah-ticker/common';
import React, { useContext, useEffect, useState } from 'react';
import { getAccessToken } from 'src/helpers';
import { useApp } from './AppContext';

interface AuthState {
  user?: IUser;
  setUser: (user: IUser) => void;
  accessToken?: string;
  setAccessToken: (token: string) => void;
}

const AuthStateContext = React.createContext<AuthState | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const { setLoading } = useApp();

  const [user, setUser] = useState<IUser>();
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    setAccessToken(getAccessToken());
  }, []);

  const getUser = async () => {
    setLoading(true);

    try {
      const res = await userApi.getMe();
      setUser(res);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (accessToken) {
      // userApi
      //   .getMe()
      //   .then((data: IUser) => {
      //     setUser(data);
      //     setLoading(false);
      //   })
      //   .catch(() => setLoading(false));
      // console.log('get ');
      getUser();
    } else {
      if (user) {
        setUser(undefined);
      }
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [accessToken]);

  return (
    <AuthStateContext.Provider
      value={{ user, setUser, accessToken, setAccessToken }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error(
      'useAuth must be inside a AuthStateContext with a state value',
    );
  }
  return context;
};
