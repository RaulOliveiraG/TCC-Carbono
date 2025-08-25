import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeColors } from '@/styles/theme';
import { Button } from '../common/Button';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

const FilterSelector = ({ label, options }: { label: string; options: string[] }) => {
  const colors = useThemeColors();
  return (
    <View style={styles.filterGroup}>
      <Text style={[styles.filterLabel, { color: colors.textPrimary }]}>{label}</Text>
      <View style={styles.optionsContainer}>
        {options.map(option => (
          <TouchableOpacity key={option} style={[styles.optionButton, { backgroundColor: colors.primaryLighter, borderColor: colors.primaryLight }]}>
            <Text style={[styles.optionText, { color: colors.primaryDark }]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export function FilterModal({ visible, onClose }: FilterModalProps) {
  const colors = useThemeColors();

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
        <ScrollView>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Filtros Avançados</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.closeButtonText, { color: colors.primary }]}>Fechar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filtersContent}>
            <FilterSelector label="Região" options={['Amazônia', 'Mata Atlântica', 'Cerrado']} />
            <FilterSelector label="Preço (ETH)" options={['Até 1', '1 - 5', '5+']} />
            <FilterSelector label="Créditos de Carbono (toneladas)" options={['1-10', '11-50', '50+']} />
          </View>
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.card }]}>
          <Button title="Limpar Filtros" onPress={() => {}} variant="outline" />
          <Button title="Aplicar Filtros" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeButtonText: {
    fontSize: 16,
  },
  filtersContent: {
    padding: 20,
  },
  filterGroup: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20,
  },
  optionText: {},
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
  },
});