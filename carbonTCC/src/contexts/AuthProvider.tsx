import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, Usuario, AuthResponse } from '../types/auth';
import { authService } from '../services/api';
import { LoginData, RegistroData } from '@/utils/validationSchemas';
import { useRouter } from 'expo-router';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('auth_token');
      const storedUser = await AsyncStorage.getItem('user_data');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
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
        await AsyncStorage.setItem('auth_token', response.token);
        await AsyncStorage.setItem('user_data', JSON.stringify(response.usuario));

        setToken(response.token);
        setUser(response.usuario);
        router.replace({ pathname: '/home' });
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
        await AsyncStorage.setItem('auth_token', response.token);
        await AsyncStorage.setItem('user_data', JSON.stringify(response.usuario));

        setToken(response.token);
        setUser(response.usuario);
        router.replace({ pathname: '/home' });
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
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');
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
    // --- INÍCIO DA MODIFICAÇÃO ---
    setUser, // Expondo a função setUser no valor do contexto
    // --- FIM DA MODIFICAÇÃO ---
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