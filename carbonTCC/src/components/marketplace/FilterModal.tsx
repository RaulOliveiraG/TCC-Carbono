import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '@/constants/colors';
import { Button } from '../common/Button';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

// Componente simples para um seletor (simulado)
const FilterSelector = ({ label, options }: { label: string; options: string[] }) => (
  <View style={styles.filterGroup}>
    <Text style={styles.filterLabel}>{label}</Text>
    <View style={styles.optionsContainer}>
      {options.map(option => (
        <TouchableOpacity key={option} style={styles.optionButton}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export function FilterModal({ visible, onClose }: FilterModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filtros Avançados</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filtersContent}>
            <FilterSelector label="Região" options={['Amazônia', 'Mata Atlântica', 'Cerrado']} />
            <FilterSelector label="Preço (ETH)" options={['Até 1', '1 - 5', '5+']} />
            <FilterSelector label="Créditos de Carbono (toneladas)" options={['1-10', '11-50', '50+']} />
            {/* Adicione mais filtros aqui conforme necessário */}
          </View>
        </ScrollView>

        <View style={styles.footer}>
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
    backgroundColor: COLORS.background,
    paddingTop: 50, // Espaço para a status bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  closeButtonText: {
    fontSize: 16,
    color: COLORS.primary,
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
    color: COLORS.textPrimary,
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
    backgroundColor: COLORS.primaryLighter,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    borderRadius: 20,
  },
  optionText: {
    color: COLORS.primaryDark,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
});