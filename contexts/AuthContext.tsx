import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole, AuthState } from '@/types/user';

interface AuthContextType extends AuthState {
  login: (noRegis: string, password: string, role: UserRole) => Promise<void>;
  register: (username: string, noRegis: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = '@auth_user';
const STORAGE_KEY_ROLE = '@auth_role';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from storage on mount
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem(STORAGE_KEY);
      const roleData = await AsyncStorage.getItem(STORAGE_KEY_ROLE);
      
      if (userData && roleData) {
        const parsedUser = JSON.parse(userData);
        const role = roleData as UserRole;
        setUser({ ...parsedUser, role });
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (noRegis: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call
      // For now, using mock data
      const mockUser: User = {
        id: `user_${Date.now()}`,
        username: noRegis,
        noRegis,
        role,
        nama: role === 'lecturer' ? 'Dr. John Doe, M.Kom' : 'Mahasiswa Example',
        email: role === 'lecturer' ? 'john.doe@unklab.ac.id' : 'student@unklab.ac.id',
        fakultas: 'Ilmu Komputer',
        ...(role === 'student' 
          ? { jurusan: 'Informatika', nim: noRegis }
          : { nidn: noRegis }
        ),
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
      await AsyncStorage.setItem(STORAGE_KEY_ROLE, role);
      
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, noRegis: string, password: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call
      // For now, using mock data
      const newUser: User = {
        id: `user_${Date.now()}`,
        username,
        noRegis,
        role,
        nama: username,
        email: `${username}@unklab.ac.id`,
        fakultas: 'Ilmu Komputer',
        ...(role === 'student' 
          ? { jurusan: 'Informatika', nim: noRegis }
          : { nidn: noRegis }
        ),
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      await AsyncStorage.setItem(STORAGE_KEY_ROLE, role);
      
      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      await AsyncStorage.removeItem(STORAGE_KEY_ROLE);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...userData };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

