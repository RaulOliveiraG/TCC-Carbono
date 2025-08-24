import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../constants/colors';

const impactData = [
  { value: '500K+', label: 'Árvores Plantadas' },
  { value: '100K+', label: 'NFTs Criados' },
  { value: '10K+', label: 'Toneladas de CO₂' },
  { value: '15+', label: 'Projetos Apoiados' },
];

const ImpactStat = ({ value, label }: { value: string; label: string }) => (
  <View style={styles.impactItem}>
    <Text style={styles.impactNumber}>{value}</Text>
    <Text style={styles.impactText}>{label}</Text>
  </View>
);

export function ImpactSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.tag}>Impacto</Text>
      <Text style={styles.sectionTitle}>Transformando o Planeta Juntos</Text>
      <Text style={styles.sectionText}>
        Nosso marketplace já contribuiu significativamente para a restauração de ecossistemas.
      </Text>
      <View style={styles.impactContainer}>
        {impactData.map(item => (
          <ImpactStat key={item.label} value={item.value} label={item.label} />
        ))}
      </View>
      <Image source={require('../../assets/images/grafico.png')} style={styles.impactImage} />
      <Text style={styles.sectionText}>
        Comece hoje mesmo a investir em NFTs com propósito e ajude a construir um futuro mais sustentável.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 20,
    backgroundColor: COLORS.primaryDark,
    alignItems: 'center',
  },
  tag: {
    backgroundColor: COLORS.primary,
    color: COLORS.primaryLight,
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
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: COLORS.textLight,
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
    color: COLORS.white,
  },
  impactText: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  impactImage: {
    width: '100%',
    height: 170,
    borderRadius: 5,
    marginBottom: 30,
  },
});