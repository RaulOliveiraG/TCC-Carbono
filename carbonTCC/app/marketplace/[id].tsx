import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Nft } from '@/types/nft';
import { useThemeColors } from '@/styles/theme';
import { Button } from '@/components/common/Button';

export default function NftDetailScreen() {
  const params = useLocalSearchParams<{ nft: string }>();
  const router = useRouter();
  const colors = useThemeColors();

  const nft: Nft | null = params.nft ? JSON.parse(params.nft) : null;

  if (!nft) {
    return (
      <View style={styles.container}>
        <Text>NFT não encontrado.</Text>
      </View>
    );
  }

  const getAttributeValue = (traitType: string) => {
    return nft.metadata.attributes?.find(a => a.trait_type === traitType)?.value;
  };

  const handleConfirmPurchase = () => {
    Alert.alert(
      "Confirmação de Compra",
      `O sistema de transferAsync do thirdweb não funciona a todo momento com React Native. Portanto, a compra não pode ser concluída nesta demonstração.`,
      [{ text: "OK" }]
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: nft.metadata.name, headerBackTitle: 'Voltar' }} />
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <Image source={{ uri: nft.metadata.image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>{nft.metadata.name}</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>{nft.metadata.description}</Text>

          <View style={[styles.attributesContainer, { borderColor: colors.border }]}>
            <Text style={[styles.attributesTitle, { color: colors.textPrimary }]}>Atributos</Text>
            <View style={styles.attributeRow}>
              <Text style={styles.attributeLabel}>Região:</Text>
              <Text style={[styles.attributeValue, { color: colors.textPrimary }]}>{getAttributeValue('Região')}</Text>
            </View>
            <View style={styles.attributeRow}>
              <Text style={styles.attributeLabel}>Créditos:</Text>
              <Text style={[styles.attributeValue, { color: colors.textPrimary }]}>{getAttributeValue('Créditos (Ton CO2)')} Ton CO₂</Text>
            </View>
          </View>

          <View style={[styles.purchaseBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Preço</Text>
              <Text style={[styles.priceValue, { color: colors.primary }]}>
                {getAttributeValue('Preço (MATIC)')} MATIC
              </Text>
            </View>
            <Button title="Confirmar Compra" onPress={handleConfirmPurchase} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  attributesContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginBottom: 20,
  },
  attributesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  attributeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  attributeLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  attributeValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  purchaseBox: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 15,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  priceLabel: {
    fontSize: 18,
    color: '#6B7280',
  },
  priceValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});