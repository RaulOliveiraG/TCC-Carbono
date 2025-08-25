import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '@/constants/colors';
import { Button } from '../common/Button';

export interface NFTCardProps {
  name: string;
  price: string;
  co2: string;
}

export function NFTCard({ name, price, co2 }: NFTCardProps) {
  return (
    <View style={styles.cardContainer}>
      {/* Placeholder para a imagem do NFT */}
      <View style={styles.imagePlaceholder} />

      <View style={styles.contentContainer}>
        <Text style={styles.nftName}>{name}</Text>
        <Text style={styles.co2Text}>{co2} toneladas de CO₂ compensadas</Text>

        <View style={styles.footer}>
          <Text style={styles.priceText}>{price}</Text>
          <Button title="Comprar" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '45%', // Para caber 2 por linha com algum espaço
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.border,
  },
  contentContainer: {
    padding: 10,
  },
  nftName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  co2Text: {
    fontSize: 12,
    color: COLORS.textSecondary,
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
    color: COLORS.primary,
  },
});