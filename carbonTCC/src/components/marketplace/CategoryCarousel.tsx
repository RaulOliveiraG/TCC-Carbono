import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '@/constants/colors';

const categories = ['Destaques', 'Amazônia', 'Mata Atlântica', 'Cerrado'];

export function CategoryCarousel() {
  const [selectedCategory, setSelectedCategory] = useState('Destaques');

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.chip,
              selectedCategory === category && styles.selectedChip,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.chipText,
                selectedCategory === category && styles.selectedChipText,
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
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
  },
  selectedChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  selectedChipText: {
    color: COLORS.white,
  },
});