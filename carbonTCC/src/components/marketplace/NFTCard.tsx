import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Nft } from '@/types/nft';
import { useThemeColors } from '@/styles/theme';
import { useRouter } from 'expo-router';
import { Button } from '../common/Button';

export interface NFTCardProps {
  nft: Nft;
}

export function NFTCard({ nft }: NFTCardProps) {
  const colors = useThemeColors();

  const router = useRouter();

  const handleBuyPress = () => {
    router.push({
      pathname: `/marketplace/${nft.id}`,
      params: { nft: JSON.stringify(nft) },
    });
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: colors.card }]}>
      <Image source={{ uri: nft.metadata.image }} style={styles.imagePlaceholder} />

      <View style={styles.contentContainer}>
        <Text style={[styles.nftName, { color: colors.textPrimary }]}>{nft.metadata.name}</Text>
        <Text style={[styles.co2Text, { color: colors.textSecondary }]}>
          ID: #{nft.id}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.priceText, { color: colors.primary }]}>1 MATIC</Text>
          <Button title="Comprar" onPress={handleBuyPress} />
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
    resizeMode: 'cover',
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