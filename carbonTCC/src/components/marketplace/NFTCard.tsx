import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { Button } from '../common/Button';

interface NFT {
  id: string;
  name: string;
  co2: string;
  price: string;
}

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>{nft.name}</Text>
          <Text style={styles.price}>{nft.price}</Text>
        </View>
        <Text style={styles.co2}>{nft.co2}</Text>
        <Button title="Comprar Agora" onPress={() => {}} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, // Permite que o card ocupe o espaço da coluna
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10, // Espaçamento entre as linhas
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: COLORS.border,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Alinha os itens no topo
    marginBottom: 5,
    gap: 5, // Espaço entre o nome e o preço
  },
  name: {
    flex: 1, // Permite que o nome ocupe o espaço e quebre a linha
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  co2: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  button: {
    width: '100%',
  },
});