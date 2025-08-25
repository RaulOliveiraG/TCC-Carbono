import { useThemeStore } from '@/stores/themeStore';

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  primaryLighter: string;
  
  background: string;
  card: string;
  
  textPrimary: string;
  textSecondary: string;
  // --- INÍCIO DA MODIFICAÇÃO ---
  textLight: string; // Adicionamos a chave que faltava
  // --- FIM DA MODIFICAÇÃO ---
  
  border: string;
  white: string;
  black: string;
  transparent: string;
}

const lightColors: ThemeColors = {
  primary: '#059669',
  primaryDark: '#064E3B',
  primaryLight: '#D1FAE5',
  primaryLighter: '#ECFDF5',
  background: '#FFFFFF',
  card: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  // --- INÍCIO DA MODIFICAÇÃO ---
  textLight: '#D1FAE5', // Definimos o valor para o tema claro
  // --- FIM DA MODIFICAÇÃO ---
  border: '#E5E7EB',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

const darkColors: ThemeColors = {
  primary: '#059669',
  primaryDark: '#064E3B',
  primaryLight: '#D1FAE5',
  primaryLighter: '#1F2937',
  background: '#111827',
  card: '#1F2937',
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  // --- INÍCIO DA MODIFICAÇÃO ---
  textLight: '#D1FAE5', // Definimos o valor para o tema escuro (pode ser o mesmo ou diferente)
  // --- FIM DA MODIFICAÇÃO ---
  border: '#374151',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const useThemeColors = (): ThemeColors => {
  const theme = useThemeStore((state) => state.theme);
  return theme === 'dark' ? darkColors : lightColors;
};

export const lightThemeColors = lightColors;