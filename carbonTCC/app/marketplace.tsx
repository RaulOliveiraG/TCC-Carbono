import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/common/Button';
import { NFTCard } from '@/components/marketplace/NFTCard';
import { COLORS } from '@/constants/colors';

const nfts = [
  { id: '1', name: 'Cerrado NFT #401', co2: '6 toneladas de CO₂ compensadas', price: '1.2 ETH' },
  { id: '2', name: 'Amazônia NFT #256', co2: '8 toneladas de CO₂ compensadas', price: '1.5 ETH' },
  { id: '3', name: 'Mata Atlântica NFT #789', co2: '5 toneladas de CO₂ compensadas', price: '1.1 ETH' },
  { id: '4', name: 'Cerrado NFT #402', co2: '6 toneladas de CO₂ compensadas', price: '1.2 ETH' },
  { id: '5', name: 'Amazônia NFT #257', co2: '8 toneladas de CO₂ compensadas', price: '1.5 ETH' },
  { id: '6', name: 'Mata Atlântica NFT #790', co2: '5 toneladas de CO₂ compensadas', price: '1.1 ETH' },
];

const FilterPill = ({ label, active }: { label: string; active?: boolean }) => (
  <View style={[styles.pill, active && styles.activePill]}>
    <Text style={[styles.pillText, active && styles.activePillText]}>{label}</Text>
  </View>
);

// Componente de Cabeçalho para a FlatList
const ListHeader = () => (
  <>
    <View style={styles.headerSection}>
      <Text style={styles.tag}>Marketplace</Text>
      <Text style={styles.title}>Explore Nossos NFTs</Text>
      <Text style={styles.subtitle}>
        Descubra coleções exclusivas de NFTs que representam árvores reais e geram créditos de carbono.
      </Text>
    </View>

    {/* Filtros agora estão em uma ScrollView horizontal para evitar quebra de layout */}
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
    >
      <FilterPill label="Destaques" active />
      <FilterPill label="Amazônia" />
      <FilterPill label="Mata Atlântica" />
      <FilterPill label="Cerrado" />
      <FilterPill label="Caatinga" />
    </ScrollView>
  </>
);

// Componente de Rodapé para a FlatList
const ListFooter = () => (
  <>
    <View style={styles.advancedFilters}>
      <Text style={styles.advancedFiltersTitle}>Filtros Avançados</Text>
      <Text style={styles.advancedFiltersSubtitle}>
        Encontre o NFT perfeito para seu investimento em sustentabilidade.
      </Text>
      <Button title="Aplicar Filtros" onPress={() => {}} />
    </View>
    <Footer />
  </>
);

export default function MarketplaceScreen() {
  return (
    <View style={styles.container}>
      <Header />
      {/* 
        A FlatList agora é o componente principal de rolagem,
        eliminando o erro de aninhamento.
      */}
      <FlatList
        data={nfts}
        renderItem={({ item }) => <NFTCard nft={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.listContentContainer}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  tag: {
    backgroundColor: COLORS.primaryLight,
    color: COLORS.primaryDark,
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  pill: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activePill: {
    backgroundColor: COLORS.primaryLighter,
  },
  pillText: {
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  activePillText: {
    color: COLORS.primaryDark,
  },
  listContentContainer: {
    paddingHorizontal: 10,
  },
  row: {
    gap: 10, // Adiciona espaçamento entre as colunas
  },
  advancedFilters: {
    padding: 20,
    marginHorizontal: 10,
    marginTop: 20,
    backgroundColor: COLORS.primaryLighter,
    borderRadius: 10,
    alignItems: 'center',
  },
  advancedFiltersTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  advancedFiltersSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
});