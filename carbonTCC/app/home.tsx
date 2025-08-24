import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/common/Button';
import { SalesCard } from '@/components/home/SalesCard';
import { ProcessSection } from '@/components/home/ProcessSection';
import { ImpactSection } from '@/components/home/ImpactSection';
import { COLORS } from '@/constants/colors';
import { useRouter } from 'expo-router'; // Importado o useRouter

export default function HomePage() {
  const router = useRouter(); // Hook para navegação
  const scrollViewRef = useRef<ScrollView>(null);
  const processSectionY = useRef(0);

  const handleScrollToProcess = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: processSectionY.current,
        animated: true,
      });
    }
  };

  // Função para navegar para o marketplace
  const navigateToMarketplace = () => {
    router.push('/marketplace');
  };

  return (
    <View style={styles.mainContainer}>
      <Header onHowItWorksPress={handleScrollToProcess} />
      <ScrollView ref={scrollViewRef}>
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0)', COLORS.primaryExtraLight]}
            style={styles.gradient}
          />
          <Text style={styles.tag}>Inovação em Sustentabilidade</Text>
          <Text style={styles.sectionTitle}>Transforme Árvores em NFTs e Créditos de Carbono</Text>
          <Text style={styles.sectionText}>
            Nosso marketplace conecta reflorestamento ao mundo digital, permitindo que você invista em NFTs com valor real para o planeta.
          </Text>
          <View style={styles.buttonContainer}>
            {/* O botão "Explorar NFTs" agora navega para a nova tela */}
            <Button title="Explorar NFTs" onPress={navigateToMarketplace} />
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

// Os estilos permanecem os mesmos
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heroSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tag: {
    backgroundColor: COLORS.primaryLight,
    color: COLORS.primaryDark,
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
    color: COLORS.textPrimary,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});