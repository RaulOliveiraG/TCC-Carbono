import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeColors } from '@/styles/theme';

const categories = ['Destaques', 'Amazônia', 'Mata Atlântica', 'Cerrado'];

export function CategoryCarousel() {
  const [selectedCategory, setSelectedCategory] = useState('Destaques');
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.chip,
              { backgroundColor: colors.card, borderColor: colors.border },
              selectedCategory === category && { backgroundColor: colors.primary, borderColor: colors.primary },
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.chipText,
                { color: colors.textSecondary },
                selectedCategory === category && { color: colors.white },
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20,
  },
  chipText: {
    fontWeight: '500',
  },
});