import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse } from '@/types/auth';
import { LoginData, RegistroData, EsqueciSenhaData, RedefinirSenhaData } from '@/utils/validationSchemas';
import { UpdateProfileData } from '@/utils/validationSchemas';
import { ChangePasswordData } from '@/utils/validationSchemas';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
console.log('API Base URL:', API_BASE_URL); 

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.multiRemove(['auth_token', 'user_data']);
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post('/Auth/login', data);
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
      const response = await api.post('/Auth/registro', data);
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

  async solicitarRecuperacaoSenha(data: EsqueciSenhaData): Promise<AuthResponse> {
    try {
      const response = await api.post('/Auth/solicitar-recuperacao', data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Erro de conexão. Verifique sua internet e tente novamente.',
      };
    }
  },

  async checkUserExists(email: string): Promise<boolean> {
    try {
      const response = await api.get(`/Auth/usuario-existe?email=${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      return false;
    }
  },
    async updateProfile(data: UpdateProfileData): Promise<AuthResponse> {
    try {
      const response = await api.put('/Auth/perfil', data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Erro de conexão. Verifique sua internet e tente novamente.',
      };
    }
  },
    async redefinirSenha(data: RedefinirSenhaData): Promise<AuthResponse> {
    try {
      const response = await api.post('/Auth/redefinir-senha', data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Erro de conexão. Verifique sua internet e tente novamente.',
      };
    }
  },
    async changePassword(data: ChangePasswordData): Promise<AuthResponse> {
    try {
      const response = await api.post('/Auth/alterar-senha', data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: 'Erro de conexão. Verifique sua internet e tente novamente.',
      };
    }
  },
};

export default api;