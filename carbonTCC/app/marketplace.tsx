import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/common/Button';
import { NFTCard } from '@/components/marketplace/NFTCard';
import { FilterModal } from '@/components/marketplace/FilterModal';
import { CategoryCarousel } from '@/components/marketplace/CategoryCarousel';
import { useThemeColors } from '@/styles/theme';

export default function MarketplaceScreen() {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <ScrollView>
        <View style={[styles.pageHeader, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Explore Nossos NFTs</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Descubra coleções exclusivas de NFTs que representam árvores reais e geram créditos de carbono.
          </Text>
        </View>

        <CategoryCarousel />

        <View style={[styles.actionsSection, { borderTopColor: colors.border, borderBottomColor: colors.border }]}>
          <Text style={[styles.resultsText, { color: colors.textSecondary }]}>Exibindo 128 resultados</Text>
          <Button title="Filtros" onPress={() => setFilterModalVisible(true)} variant="outline" />
        </View>

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
  },
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  actionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  resultsText: {
    fontWeight: '500',
  },
  nftGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});