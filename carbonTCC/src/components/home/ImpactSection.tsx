import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '@/styles/theme';
import { PriceChart } from './PriceChart'; // Importamos o novo componente de gráfico

const impactData = [
  { value: '500K+', label: 'Árvores Plantadas' },
  { value: '25K+', label: 'NFTs Criados' },
  { value: '10K+', label: 'Toneladas de CO₂' },
  { value: '15+', label: 'Hectares Reflorestados' },
];

// O subcomponente agora recebe as cores como prop para evitar chamar o hook múltiplas vezes
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
          // Passamos o objeto de cores para o filho
          <ImpactStat key={item.label} value={item.value} label={item.label} colors={colors} />
        ))}
      </View>
      
      {/* --- INÍCIO DA MODIFICAÇÃO --- */}
      {/* Substituímos a imagem estática pelo nosso componente de gráfico dinâmico */}
      <PriceChart />
      {/* --- FIM DA MODIFICAÇÃO --- */}

      <Text style={[styles.sectionText, { color: colors.textLight, marginTop: 16 }]}>
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
  // O estilo impactImage foi removido pois não é mais necessário
});