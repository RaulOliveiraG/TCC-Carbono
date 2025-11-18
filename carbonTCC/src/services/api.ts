import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse } from '@/types/auth';
import { Nft } from '@/types/nft';
import { LoginData, RegistroData, EsqueciSenhaData, RedefinirSenhaData, UpdateProfileData, ChangePasswordData } from '@/utils/validationSchemas';
import { mockNfts } from '@/data/mockNfts'; 

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

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
  (error) => Promise.reject(error)
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
      return { success: false, message: error.response?.data?.message || 'Erro de conexão.' };
    }
  },
  async register(data: RegistroData): Promise<AuthResponse> {
    try {
      const response = await api.post('/Auth/registro', data);
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Erro de conexão.' };
    }
  },
  async solicitarRecuperacaoSenha(data: EsqueciSenhaData): Promise<AuthResponse> {
    try {
      const response = await api.post('/Auth/solicitar-recuperacao', data);
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Erro de conexão.' };
    }
  },
  async redefinirSenha(data: RedefinirSenhaData): Promise<AuthResponse> {
    try {
      const response = await api.post('/Auth/redefinir-senha', data);
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Erro de conexão.' };
    }
  },
  async changePassword(data: ChangePasswordData): Promise<AuthResponse> {
    try {
      const response = await api.post('/Auth/alterar-senha', data);
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Erro de conexão.' };
    }
  },
  async updateProfile(data: UpdateProfileData): Promise<AuthResponse> {
    try {
      const response = await api.put('/Auth/perfil', data);
      return response.data;
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Erro de conexão.' };
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
};

const USE_MOCK_DATA = true; 

export const nftService = {
  async getAllNfts(params?: { regiao?: string; precoMax?: number; creditosMin?: number }): Promise<Nft[]> {
    if (USE_MOCK_DATA) {
      console.log("Usando dados mockados para NFTs.");
      return new Promise(resolve => {
        setTimeout(() => {
          let nfts = mockNfts;
          if (params?.regiao) {
            nfts = nfts.filter(n => n.metadata.attributes?.some(a => a.trait_type === 'Região' && a.value === params.regiao));
          }
          resolve(nfts);
        }, 500);
      });
    }

    try {
      console.log("Buscando NFTs da API real com filtros:", params);
      const response = await api.get('/nfts', { params });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar NFTs da API:', error);
      return [];
    }
  },
};

export default api;