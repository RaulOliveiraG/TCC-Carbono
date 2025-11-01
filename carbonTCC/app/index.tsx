import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useThemeColors } from '@/styles/theme'; 
import { useAuth } from '@/contexts/AuthProvider';

export default function SplashScreen() {
  const router = useRouter();
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const colors = useThemeColors();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        if (isAuthenticated) {
          router.replace({ pathname: '/home' });
        } else {
          router.replace({ pathname: '/login' });
        }
      }, 1500);
    }
  }, [isLoading, isAuthenticated, router]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.Image
        source={require('../src/assets/images/logo.png')}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </View>
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