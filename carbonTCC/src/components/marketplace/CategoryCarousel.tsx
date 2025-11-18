import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeColors } from '@/styles/theme';

const categories = ['Destaques', 'Amazônia', 'Mata Atlântica', 'Cerrado'];

interface CategoryCarouselProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryCarousel({ selectedCategory, onSelectCategory }: CategoryCarouselProps) {
  const colors = useThemeColors();

  const handlePress = (category: string) => {
    const newCategory = category === 'Destaques' ? null : category;
    onSelectCategory(newCategory);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {categories.map(category => {
          const isActive = selectedCategory === category || (category === 'Destaques' && selectedCategory === null);

          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.chip,
                { backgroundColor: colors.card, borderColor: colors.border },
                isActive && { backgroundColor: colors.primary, borderColor: colors.primary },
              ]}
              onPress={() => handlePress(category)}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: colors.textSecondary },
                  isActive && { color: colors.white },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
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