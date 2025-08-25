import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
// --- INÍCIO DA MODIFICAÇÃO ---
import { useThemeColors } from '@/styles/theme'; // Importamos o novo hook
import { useAuth } from '@/contexts/AuthProvider';
// --- FIM DA MODIFICAÇÃO ---

export default function SplashScreen() {
  const router = useRouter();
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  // --- INÍCIO DA MODIFICAÇÃO ---
  const colors = useThemeColors(); // Usamos o hook para obter as cores
  const { isAuthenticated, isLoading } = useAuth();
  // --- FIM DA MODIFICAÇÃO ---

  useEffect(() => {
    if (!isLoading) {
      // Adicionamos um pequeno delay para a animação ser visível
      setTimeout(() => {
        if (isAuthenticated) {
          router.replace({ pathname: '/home' });
        } else {
          router.replace({ pathname: '/login' });
        }
      }, 1500); // Tempo da animação
    }
  }, [isLoading, isAuthenticated, router]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    // --- INÍCIO DA MODIFICAÇÃO ---
    // Aplicamos a cor de fundo dinâmica
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.Image
        source={require('../src/assets/images/logo.png')}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </View>
    // --- FIM DA MODIFICAÇÃO ---
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 100,
  },
});