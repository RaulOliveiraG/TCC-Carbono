import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '@/styles/theme';
import { Button } from '../common/Button';

export interface NFTCardProps {
  name: string;
  price: string;
  co2: string;
}

export function NFTCard({ name, price, co2 }: NFTCardProps) {
  const colors = useThemeColors();

  return (
    <View style={[styles.cardContainer, { backgroundColor: colors.card }]}>
      <View style={[styles.imagePlaceholder, { backgroundColor: colors.border }]} />

      <View style={styles.contentContainer}>
        <Text style={[styles.nftName, { color: colors.textPrimary }]}>{name}</Text>
        <Text style={[styles.co2Text, { color: colors.textSecondary }]}>{co2} toneladas de CO₂ compensadas</Text>

        <View style={styles.footer}>
          <Text style={[styles.priceText, { color: colors.primary }]}>{price}</Text>
          <Button title="Comprar" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '45%',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 150,
  },
  contentContainer: {
    padding: 10,
  },
  nftName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  co2Text: {
    fontSize: 12,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});