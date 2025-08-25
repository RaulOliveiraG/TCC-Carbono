import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { Header } from '@/components/layout/Header'; // Reutilizaremos o Header

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Usamos o Stack.Screen para dar um título à página */}
      <Stack.Screen options={{ headerShown: false }} />
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Configurações</Text>
          <Text style={styles.subtitle}>Gerencie seu perfil e preferências.</Text>
        </View>

        {/* Seções de Configurações (placeholders por enquanto) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil</Text>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Alterar Nome e Telefone</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.rowLabel}>Alterar Senha</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Tema Escuro</Text>
            {/* Adicionaremos um Switch aqui depois */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Usará a cor do tema no futuro
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: COLORS.primaryLighter,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  rowLabel: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  arrow: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
});