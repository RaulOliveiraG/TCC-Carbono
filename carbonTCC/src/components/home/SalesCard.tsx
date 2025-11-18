import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors } from '@/styles/theme';
import { Button } from '../common/Button';
import { useRouter } from 'expo-router';

export function SalesCard() {
  const colors = useThemeColors();
  const router = useRouter();
  const imageUrl = "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop";

  return (
    <ImageBackground
      source={{ uri: imageUrl }}
      style={[styles.salesBox, { borderColor: colors.primary }]}
      imageStyle={{ borderRadius: 9 }} 
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: colors.white }]}>Amazônia NFT - Exemplo</Text>
        
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.primaryLight }]}>Representa:</Text>
          <Text style={[styles.infoValue, { color: colors.white }]}>12 Toneladas de CO₂ Compensadas</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.primaryLight }]}>Origem:</Text>
          <Text style={[styles.infoValue, { color: colors.white }]}>Projeto de Reflorestamento Verificado</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={[styles.infoLabel, { color: colors.primaryLight }]}>Tecnologia:</Text>
          <Text style={[styles.infoValue, { color: colors.white }]}>Registrado na Blockchain Polygon</Text>
        </View>

        <View style={styles.buySection}>
          <Text style={[styles.priceLabel, { color: colors.white }]}>A partir de 2.5 MATIC</Text>
          <Button title="Ver no Marketplace" onPress={() => router.push('/marketplace')} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  salesBox: {
    borderWidth: 1,
    borderRadius: 10,
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
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    width: 90, 
  },
  infoValue: {
    fontSize: 14,
    flex: 1,
  },
  buySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});