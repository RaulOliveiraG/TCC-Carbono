import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/common/Button';
import { SalesCard } from '@/components/home/SalesCard';
import { ProcessSection } from '@/components/home/ProcessSection';
import { ImpactSection } from '@/components/home/ImpactSection';
import { useThemeColors } from '@/styles/theme';

export default function HomePage() {
  const scrollViewRef = useRef<ScrollView>(null);
  const processSectionY = useRef(0);
  const colors = useThemeColors();

  const handleScrollToProcess = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: processSectionY.current,
        animated: true,
      });
    }
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <Header onHowItWorksPress={handleScrollToProcess} />
      <ScrollView ref={scrollViewRef}>
        <View style={[styles.heroSection, { borderBottomColor: colors.border }]}>
          <LinearGradient
            colors={[colors.transparent, colors.primaryLighter]}
            style={styles.gradient}
          />
          <Text style={[styles.tag, { backgroundColor: colors.primaryLight, color: colors.primaryDark }]}>Inovação em Sustentabilidade</Text>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Transforme Árvores em NFTs e Créditos de Carbono</Text>
          <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
            Nosso marketplace conecta reflorestamento ao mundo digital, permitindo que você invista em NFTs com valor real para o planeta.
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Explorar NFTs" onPress={() => {}} />
            <Button title="Saiba Mais" onPress={handleScrollToProcess} variant="outline" />
          </View>
          <SalesCard
            nftName="Amazônia NFT #127"
            co2Compensated="12 toneladas de CO₂ compensadas"
            price="2.5 ETH"
          />
        </View>

        <View
          onLayout={(event) => {
            processSectionY.current = event.nativeEvent.layout.y;
          }}
        >
          <ProcessSection />
        </View>

        <ImpactSection />
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  heroSection: {
    padding: 20,
    borderBottomWidth: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tag: {
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});