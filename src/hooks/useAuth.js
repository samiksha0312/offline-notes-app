import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, logout as doLogout } from '../storage/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [initAuthLoaded, setInitAuthLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
      setInitAuthLoaded(true);
    })();
  }, []);

  const logout = async () => {
    await doLogout();
    setCurrentUser(null);
  };

  const value = { currentUser, setCurrentUser, logout, initAuthLoaded };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}