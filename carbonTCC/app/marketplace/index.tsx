import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { nftService } from '@/services/api';
import { Nft } from '@/types/nft';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/common/Button';
import { NFTCard } from '@/components/marketplace/NFTCard';
import { FilterModal, Filters } from '@/components/marketplace/FilterModal';
import { CategoryCarousel } from '@/components/marketplace/CategoryCarousel';
import { useThemeColors } from '@/styles/theme';

export default function MarketplaceScreen() {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const colors = useThemeColors();

  const [nfts, setNfts] = useState<Nft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Filters>({
    regiao: null,
    precoMax: null,
    creditosMin: null,
  });

  const fetchNfts = useCallback(async (filters: Filters) => {
    try {
      setIsLoading(true);
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== null)
      );
      const fetchedNfts = await nftService.getAllNfts(params);
      setNfts(fetchedNfts);
    } catch (error) {
      console.error("Falha ao carregar NFTs na tela.", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNfts(activeFilters);
  }, [activeFilters, fetchNfts]);

  const handleCategorySelect = (category: string | null) => {
    setActiveFilters(prevFilters => ({
      ...prevFilters,
      regiao: category,
    }));
  };

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

        <CategoryCarousel
          selectedCategory={activeFilters.regiao}
          onSelectCategory={handleCategorySelect}
        />

        <View style={[styles.actionsSection, { borderTopColor: colors.border, borderBottomColor: colors.border }]}>
          <Text style={[styles.resultsText, { color: colors.textSecondary }]}>
            Exibindo {nfts.length} resultados
          </Text>
          <Button title="Filtros" onPress={() => setFilterModalVisible(true)} variant="outline" />
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
        ) : (
          <View style={styles.nftGrid}>
            {nfts.length > 0 ? (
              nfts.map((nft) => <NFTCard key={nft.id} nft={nft} />)
            ) : (
              <Text style={[styles.noResultsText, { color: colors.textSecondary }]}>
                Nenhum NFT encontrado com os filtros selecionados.
              </Text>
            )}
          </View>
        )}

        <Footer />
      </ScrollView>

      <FilterModal
        visible={isFilterModalVisible}
        initialFilters={activeFilters}
        onApply={setActiveFilters}
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
  loader: {
    marginTop: 50,
  },
  noResultsText: {
    marginTop: 50,
    fontSize: 16,
    textAlign: 'center',
  },
});