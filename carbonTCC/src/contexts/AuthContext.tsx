import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, Usuario, LoginData, RegistroData, AuthResponse } from '../types/auth';
import { authService } from '../services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const [storedToken, storedUser] = await AsyncStorage.multiGet([
        'auth_token',
        'user_data',
      ]);

      if (storedToken[1] && storedUser[1]) {
        setToken(storedToken[1]);
        setUser(JSON.parse(storedUser[1]));
      }
    } catch (error) {
      console.error('Erro ao carregar dados de autenticação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await authService.login(data);

      if (response.success && response.token && response.usuario) {
        await AsyncStorage.multiSet([
          ['auth_token', response.token],
          ['user_data', JSON.stringify(response.usuario)],
        ]);

        setToken(response.token);
        setUser(response.usuario);
      }

      return response;
    } catch (error) {
      return {
        success: false,
        message: 'Erro interno. Tente novamente.',
      };
    }
  };

  const register = async (data: RegistroData): Promise<AuthResponse> => {
    try {
      const response = await authService.register(data);

      if (response.success && response.token && response.usuario) {
        await AsyncStorage.multiSet([
          ['auth_token', response.token],
          ['user_data', JSON.stringify(response.usuario)],
        ]);

        setToken(response.token);
        setUser(response.usuario);
      }

      return response;
    } catch (error) {
      return {
        success: false,
        message: 'Erro interno. Tente novamente.',
      };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['auth_token', 'user_data']);
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const isAuthenticated = !!(token && user);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

