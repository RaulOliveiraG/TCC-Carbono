import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useThemeColors } from '@/styles/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  style?: ViewStyle;
  // --- INÍCIO DA MODIFICAÇÃO ---
  disabled?: boolean; // Adicionamos a prop opcional 'disabled'
  // --- FIM DA MODIFICAÇÃO ---
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
    // --- INÍCIO DA MODIFICAÇÃO ---
    // Adicionamos um estilo de opacidade quando o botão está desabilitado
    disabled && styles.disabled,
    // --- FIM DA MODIFICAÇÃO ---
    style,
  ];

  const textStyle = [
    styles.buttonText,
    {
      color: isPrimary ? colors.white : colors.primary,
    },
  ];

  return (
    // --- INÍCIO DA MODIFICAÇÃO ---
    // Passamos a prop 'disabled' para o TouchableOpacity
    <TouchableOpacity style={containerStyle} onPress={onPress} disabled={disabled}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
    // --- FIM DA MODIFICAÇÃO ---
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