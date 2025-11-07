import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Role = 'client' | 'provider';
type User = { email: string; role: Role } | null;

type AuthContextValue = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'HT_user';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setUser(JSON.parse(raw));
        }
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = async (u: User) => {
    if (u) await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const login = async (email: string, password: string) => {
    // Mock credentials
    const client = { email: 'haustapUser@gmail.com', password: '123haustap' };
    const provider = { email: 'haustapProvider@gmail.com', password: '123haustap' };

    // Simulate async auth
    await new Promise((r) => setTimeout(r, 300));

    if (email === client.email && password === client.password) {
      const u = { email, role: 'client' as Role };
      setUser(u);
      await persist(u);
      return u;
    }

    if (email === provider.email && password === provider.password) {
      const u = { email, role: 'provider' as Role };
      setUser(u);
      await persist(u);
      return u;
    }

    // Not a mocked account
    throw new Error('Invalid email or password');
  };

  const signup = async (email: string, password: string) => {
    // For now, simulate creating a client account and signing in
    await new Promise((r) => setTimeout(r, 300));
    const u = { email, role: 'client' as Role };
    setUser(u);
    await persist(u);
    return u;
  };

  const logout = async () => {
    setUser(null);
    await persist(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
