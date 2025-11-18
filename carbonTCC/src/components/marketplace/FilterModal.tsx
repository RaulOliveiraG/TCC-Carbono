import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useThemeColors } from '@/styles/theme';
import { Button } from '../common/Button';

export interface Filters {
  regiao: string | null;
  precoMax: number | null;
  creditosMin: number | null;
}

interface FilterModalProps {
  visible: boolean;
  initialFilters: Filters;
  onApply: (filters: Filters) => void;
  onClose: () => void;
}

export function FilterModal({ visible, initialFilters, onApply, onClose }: FilterModalProps) {
  const colors = useThemeColors();
  const [tempFilters, setTempFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    setTempFilters(initialFilters);
  }, [initialFilters]);

  const handleApply = () => {
    onApply(tempFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = { regiao: null, precoMax: null, creditosMin: null };
    setTempFilters(clearedFilters);
    onApply(clearedFilters); 
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible} onRequestClose={onClose}>
      <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
        <ScrollView>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Filtros</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.closeButtonText, { color: colors.primary }]}>Fechar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filtersContent}>
            <Text style={[styles.filterLabel, { color: colors.textPrimary }]}>Região</Text>
            <View style={[styles.pickerContainer, { borderColor: colors.border }]}>
              <Picker
                selectedValue={tempFilters.regiao}
                onValueChange={(itemValue) => setTempFilters(prev => ({ ...prev, regiao: itemValue === 'todas' ? null : itemValue }))}
              >
                <Picker.Item label="Todas as Regiões" value="todas" />
                <Picker.Item label="Amazônia" value="Amazônia" />
                <Picker.Item label="Cerrado" value="Cerrado" />
                <Picker.Item label="Mata Atlântica" value="Mata Atlântica" />
              </Picker>
            </View>

            <Text style={[styles.filterLabel, { color: colors.textPrimary }]}>Preço Máximo (MATIC)</Text>
            <View style={[styles.pickerContainer, { borderColor: colors.border }]}>
              <Picker
                selectedValue={tempFilters.precoMax}
                onValueChange={(itemValue) => setTempFilters(prev => ({ ...prev, precoMax: itemValue === 0 ? null : itemValue }))}
              >
                <Picker.Item label="Qualquer Preço" value={0} />
                <Picker.Item label="Até 1.0 MATIC" value={1.0} />
                <Picker.Item label="Até 1.5 MATIC" value={1.5} />
                <Picker.Item label="Até 2.0 MATIC" value={2.0} />
              </Picker>
            </View>

            <Text style={[styles.filterLabel, { color: colors.textPrimary }]}>Créditos Mínimos (Ton CO₂)</Text>
            <View style={[styles.pickerContainer, { borderColor: colors.border }]}>
              <Picker
                selectedValue={tempFilters.creditosMin}
                onValueChange={(itemValue) => setTempFilters(prev => ({ ...prev, creditosMin: itemValue === 0 ? null : itemValue }))}
              >
                <Picker.Item label="Qualquer Quantidade" value={0} />
                <Picker.Item label="Pelo menos 5" value={5} />
                <Picker.Item label="Pelo menos 10" value={10} />
                <Picker.Item label="Pelo menos 20" value={20} />
              </Picker>
            </View>
          </View>
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.card }]}>
          <Button title="Limpar Filtros" onPress={handleClear} variant="outline" />
          <Button title="Aplicar Filtros" onPress={handleApply} />
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
  filterLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
  },
});