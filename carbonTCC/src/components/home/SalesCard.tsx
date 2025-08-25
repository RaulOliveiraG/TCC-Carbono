import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors } from '@/styles/theme';
import { Button } from '../common/Button';

interface SalesCardProps {
  nftName: string;
  co2Compensated: string;
  price: string;
}

export function SalesCard({ nftName, co2Compensated, price }: SalesCardProps) {
  const colors = useThemeColors();

  return (
    <View style={[styles.salesBox, { borderColor: colors.primary, backgroundColor: colors.card }]}>
      <LinearGradient
        colors={[colors.transparent, 'rgba(0, 0, 0, 0.2)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <Text style={[styles.benefitItem, { color: colors.textSecondary }]}>{nftName}</Text>
      <Text style={[styles.benefitItem, { color: colors.textSecondary }]}>{co2Compensated}</Text>

      <View style={styles.buySection}>
        <Text style={[styles.priceLabel, { color: colors.textPrimary }]}>{price}</Text>
        <Button title="Comprar" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  salesBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    height: 400,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  benefitItem: {
    fontSize: 14,
    marginVertical: 3,
  },
  buySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});