import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useThemeColors } from '@/styles/theme';

const impactData = [
  { value: '500K+', label: 'Árvores Plantadas' },
  { value: '25K+', label: 'NFTs Criados' },
  { value: '10K+', label: 'Toneladas de CO₂' },
  { value: '15+', label: 'Projetos Apoiados' },
];

const ImpactStat = ({ value, label, colors }: { value: string; label: string; colors: ReturnType<typeof useThemeColors> }) => (
  <View style={styles.impactItem}>
    <Text style={[styles.impactNumber, { color: colors.white }]}>{value}</Text>
    <Text style={[styles.impactText, { color: colors.textLight }]}>{label}</Text>
  </View>
);

export function ImpactSection() {
  const colors = useThemeColors();

  return (
    <View style={[styles.section, { backgroundColor: colors.primaryDark }]}>
      <Text style={[styles.tag, { backgroundColor: colors.primary, color: colors.primaryLight }]}>Impacto</Text>
      <Text style={[styles.sectionTitle, { color: colors.white }]}>Transformando o Planeta Juntos</Text>
      <Text style={[styles.sectionText, { color: colors.textLight }]}>
        Nosso marketplace já contribuiu significativamente para a restauração de ecossistemas.
      </Text>
      <View style={styles.impactContainer}>
        {impactData.map(item => (
          <ImpactStat key={item.label} value={item.value} label={item.label} colors={colors} />
        ))}
      </View>
      <Image source={require('../../assets/images/grafico.png')} style={styles.impactImage} />
      <Text style={[styles.sectionText, { color: colors.textLight }]}>
        Comece hoje mesmo a investir em NFTs com propósito e ajude a construir um futuro mais sustentável.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 20,
    alignItems: 'center',
  },
  tag: {
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  impactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  impactItem: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },
  impactNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  impactText: {
    fontSize: 12,
    textAlign: 'center',
  },
  impactImage: {
    width: '100%',
    height: 170,
    borderRadius: 5,
    marginBottom: 30,
  },
});