import { IUser, userApi } from '@ah-ticker/common';
import React, { useContext, useEffect, useState } from 'react';
import { getAccessToken } from 'src/helpers';
import { useApp } from './AppContext';

interface AuthState {
  user?: IUser;
  setUser: (user: IUser) => void;
  accessToken?: string;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

const AuthStateContext = React.createContext<AuthState | null>(null);

export interface User extends IUser {
  accessToken: string;
}

export const AuthProvider: React.FC = ({ children }) => {
  const { setLoading } = useApp();

  const [user, setUser] = useState<IUser>();
  const [accessToken, setAccessToken] = useState<string>(getAccessToken());

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
    if (accessToken) {
      getUser();
    }
    // eslint-disable-next-line
  }, []);

  const logout = async () => {
    localStorage.removeItem('user');
    setAccessToken('');
    setUser(undefined);
  };

  return (
    <AuthStateContext.Provider
      value={{ user, setUser, accessToken, setAccessToken, logout }}
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
