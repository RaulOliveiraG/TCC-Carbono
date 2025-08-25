import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '@/styles/theme';

interface Step {
  id: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  { id: 1, title: 'Plantio', description: 'Árvores são plantadas em projetos de reflorestamento certificados.' },
  { id: 2, title: 'Tokenização', description: 'Cada árvore é registrada na blockchain e transformada em NFT único.' },
  { id: 3, title: 'Geração de Créditos', description: 'À medida que as árvores crescem, geram créditos de carbono verificados.' },
  { id: 4, title: 'Marketplace', description: 'Compre, venda ou troque NFTs com valor ambiental real no nosso marketplace.' },
];

const StepItem = ({ step }: { step: Step }) => {
  const colors = useThemeColors();
  return (
    <View style={styles.stepItem}>
      <Text style={[styles.stepNumberText, { color: colors.primaryDark, backgroundColor: colors.primaryLight }]}>{step.id}</Text>
      <Text style={[styles.stepTitle, { color: colors.textPrimary }]}>{step.title}</Text>
      <Text style={[styles.stepText, { color: colors.textSecondary }]}>{step.description}</Text>
    </View>
  );
};

export function ProcessSection() {
  const colors = useThemeColors();

  return (
    <View style={[styles.section, { backgroundColor: colors.primaryLighter }]}>
      <Text style={[styles.tag, { backgroundColor: colors.primaryLight, color: colors.primaryDark }]}>Processo</Text>
      <Text style={[styles.sectionSubTitle, { color: colors.textPrimary }]}>Como Funciona</Text>
      <Text style={[styles.sectionText, { color: colors.textSecondary }]}>
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
  sectionSubTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 20,
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
    fontSize: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  stepText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});