import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  style?: ViewStyle;
}

export function Button({ title, onPress, variant = 'primary', style }: ButtonProps) {
  const containerStyle = [
    styles.button,
    variant === 'primary' ? styles.primaryContainer : styles.outlineContainer,
    style,
  ];

  const textStyle = [
    styles.buttonText,
    variant === 'primary' ? styles.primaryText : styles.outlineText,
  ];

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
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
  },
  primaryContainer: {
    backgroundColor: COLORS.primary,
  },
  outlineContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  primaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
});