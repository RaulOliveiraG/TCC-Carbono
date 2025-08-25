import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
// --- INÍCIO DA MODIFICAÇÃO ---
// Corrigimos a importação. A sintaxe correta é a importação padrão.
import AsyncStorage from '@react-native-async-storage/async-storage';
// --- FIM DA MODIFICAÇÃO ---
import { Appearance } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: Appearance.getColorScheme() ?? 'light',
      _hasHydrated: false,
      setHasHydrated: (hydrated) => set({ _hasHydrated: hydrated }),
      
      toggleTheme: () => {
        const currentTheme = get().theme;
        set({ theme: currentTheme === 'light' ? 'dark' : 'light' });
      },
    }),
    {
      name: 'app-theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);