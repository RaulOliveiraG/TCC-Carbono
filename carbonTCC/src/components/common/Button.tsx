import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useThemeColors } from '@/styles/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  style?: ViewStyle;
  disabled?: boolean; 
}

export function Button({ title, onPress, variant = 'primary', style, disabled = false }: ButtonProps) {
  const colors = useThemeColors();

  const isPrimary = variant === 'primary';

  const containerStyle = [
    styles.button,
    {
      backgroundColor: isPrimary ? colors.primary : colors.transparent,
      borderColor: colors.primary,
    },
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.buttonText,
    {
      color: isPrimary ? colors.white : colors.primary,
    },
  ];

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress} disabled={disabled}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
});