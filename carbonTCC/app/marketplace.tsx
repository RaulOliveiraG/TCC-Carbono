import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { COLORS } from '@/constants/colors';
import { Button } from '@/components/common/Button';
import { NFTCard } from '@/components/marketplace/NFTCard';
import { FilterModal } from '@/components/marketplace/FilterModal';
import { CategoryCarousel } from '@/components/marketplace/CategoryCarousel';

export default function MarketplaceScreen() {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.pageHeader}>
          <Text style={styles.title}>Explore Nossos NFTs</Text>
          <Text style={styles.subtitle}>
            Descubra coleções exclusivas de NFTs que representam árvores reais e geram créditos de carbono.
          </Text>
        </View>

        {/* --- INÍCIO DA MODIFICAÇÃO --- */}
        {/* Seção do Carrossel de Categorias */}
        <CategoryCarousel />

        {/* Seção de Filtros e Ações */}
        <View style={styles.actionsSection}>
          <Text style={styles.resultsText}>Exibindo 128 resultados</Text>
          <Button title="Filtros" onPress={() => setFilterModalVisible(true)} variant="outline" />
        </View>
        {/* --- FIM DA MODIFICAÇÃO --- */}

        <View style={styles.nftGrid}>
          <NFTCard name="Cerrado NFT #401" price="1.2 ETH" co2="6" />
          <NFTCard name="Amazônia NFT #215" price="2.5 ETH" co2="12" />
          <NFTCard name="Mata Atlântica NFT #087" price="1.8 ETH" co2="9" />
          <NFTCard name="Cerrado NFT #552" price="1.3 ETH" co2="7" />
        </View>

        <Footer />
      </ScrollView>

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.white, // Mudado para branco para melhor contraste com o carrossel
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
  },
  // --- INÍCIO DA MODIFICAÇÃO ---
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  resultsText: {
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  // --- FIM DA MODIFICAÇÃO ---
  nftGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingTop: 20, // Adicionado espaço no topo da grade
  },
});