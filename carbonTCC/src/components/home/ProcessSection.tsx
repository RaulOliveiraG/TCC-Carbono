import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface Step {
  id: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  { id: 1, title: 'Plantio', description: 'Cada árvore é registrada na blockchain e transformada em NFT único.' },
  { id: 2, title: 'Tokenização', description: 'Cada árvore é registrada na blockchain e transformada em NFT único.' },
  { id: 3, title: 'Certificação', description: 'À medida que as árvores crescem, geram créditos de carbono verificados.' },
  { id: 4, title: 'Marketplace', description: 'Compre, venda ou troque NFTs com valor ambiental real no nosso marketplace.' },
];

const StepItem = ({ step }: { step: Step }) => (
  <View style={styles.stepItem}>
    <Text style={styles.stepNumberText}>{step.id}</Text>
    <Text style={styles.stepTitle}>{step.title}</Text>
    <Text style={styles.stepText}>{step.description}</Text>
  </View>
);

export function ProcessSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.tag}>Processo</Text>
      <Text style={styles.sectionSubTitle}>Como Funciona</Text>
      <Text style={styles.sectionText}>
        Um processo simples para transformar reflorestamento em ativos digitais valiosos.
      </Text>
      <View style={styles.stepsContainer}>
        <View style={styles.stepRow}>
          <StepItem step={steps[0]} />
          <StepItem step={steps[1]} />
        </View>
        <View style={styles.stepRow}>
          <StepItem step={steps[2]} />
          <StepItem step={steps[3]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 20,
    backgroundColor: COLORS.primaryLighter,
    alignItems: 'center',
  },
  tag: {
    backgroundColor: COLORS.primaryLight,
    color: COLORS.primaryDark,
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
    overflow: 'hidden',
  },
  sectionSubTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  stepsContainer: {
    width: '100%',
  },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap: 10,
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
  },
  stepNumberText: {
    color: COLORS.primaryDark,
    fontSize: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
    overflow: 'hidden',
    backgroundColor: COLORS.primaryLight,
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: COLORS.textPrimary,
  },
  stepText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 10,
  },
});