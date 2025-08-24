import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { AuthResponse } from '@/types/auth';
import { LoginData, RegistroData } from '@/utils/validationSchemas';

const API_BASE_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error('A URL da API (EXPO_PUBLIC_API_URL) não está definida no arquivo .env');
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido, limpar storage
      await AsyncStorage.multiRemove(['auth_token', 'user_data']);
      // Opcional: redirecionar para a tela de login
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post('/Auth/login', data); // Caminho ajustado para corresponder ao backend
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Erro de conexão. Verifique sua internet e se o servidor está rodando.',
      };
    }
  },

  async register(data: RegistroData): Promise<AuthResponse> {
    try {
      const response = await api.post('/Auth/registro', data); // Caminho ajustado para corresponder ao backend
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Erro de conexão. Verifique sua internet e se o servidor está rodando.',
      };
    }
  },

  async checkUserExists(email: string): Promise<boolean> {
    try {
      const response = await api.get(`/Auth/usuario-existe?email=${encodeURIComponent(email)}`); // Caminho ajustado
      return response.data;
    } catch (error) {
      return false;
    }
  },
};

export default api;