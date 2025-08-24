import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/colors';
import { Button } from '../common/Button';

interface SalesCardProps {
  nftName: string;
  co2Compensated: string;
  price: string;
}

export function SalesCard({ nftName, co2Compensated, price }: SalesCardProps) {
  return (
    <View style={styles.salesBox}>
      <LinearGradient
        colors={[COLORS.transparent, 'rgba(0, 0, 0, 0.2)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <Text style={styles.benefitItem}>{nftName}</Text>
      <Text style={styles.benefitItem}>{co2Compensated}</Text>

      <View style={styles.buySection}>
        <Text style={styles.priceLabel}>{price}</Text>
        <Button title="Comprar" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  salesBox: {
    borderWidth: 1,
    borderColor: COLORS.primary,
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
    color: COLORS.textSecondary,
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
    color: COLORS.textPrimary,
  },
});