import { IUser } from '@ah-ticker/common';
import React, { useContext, useEffect, useState } from 'react';
import { mockUser } from 'src/mock';

interface AuthState {
  user?: IUser;
  setUser?: (user: IUser) => void;
}

const AuthStateContext = React.createContext<AuthState>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    // Get user from local storage
    setUser(mockUser);
  }, []);

  return (
    <AuthStateContext.Provider value={{ user, setUser }}>
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
