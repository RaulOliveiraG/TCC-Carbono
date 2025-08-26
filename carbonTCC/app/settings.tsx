import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { Header } from '@/components/layout/Header';
import { useThemeStore } from '@/stores/themeStore';
import { useThemeColors } from '@/styles/theme';
import { ChangePasswordModal } from '@/components/settings/ChangePasswordModal';
import { UpdateProfileModal } from '@/components/settings/UpdateProfileModal'; // Importamos o novo modal

export default function SettingsScreen() {
  const { theme, toggleTheme } = useThemeStore();
  const colors = useThemeColors();
  const isDarkTheme = theme === 'dark';

  // --- INÍCIO DA MODIFICAÇÃO ---
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  // --- FIM DA MODIFICAÇÃO ---

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.headerContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Configurações</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Gerencie seu perfil e preferências.</Text>
        </View>

        {/* --- INÍCIO DA MODIFICAÇÃO --- */}
        {/* A seção de Perfil agora é apenas uma lista de links */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Perfil</Text>
          <TouchableOpacity 
            style={[styles.row, { borderBottomColor: colors.border }]}
            onPress={() => setIsProfileModalVisible(true)} // Abre o modal de perfil
          >
            <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>Alterar Nome e Telefone</Text>
            <Text style={[styles.arrow, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.row, { borderBottomColor: colors.border }]}
            onPress={() => setIsPasswordModalVisible(true)} // Abre o modal de senha
          >
            <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>Alterar Senha</Text>
            <Text style={[styles.arrow, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>
        </View>
        {/* --- FIM DA MODIFICAÇÃO --- */}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Aparência</Text>
          <View style={[styles.row, { borderBottomColor: colors.border }]}>
            <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>Tema Escuro</Text>
            <Switch
              trackColor={{ false: '#767577', true: colors.primaryLight }}
              thumbColor={isDarkTheme ? colors.primary : '#f4f3f4'}
              onValueChange={toggleTheme}
              value={isDarkTheme}
            />
          </View>
        </View>
      </ScrollView>

      {/* Renderizamos os dois modais aqui */}
      <UpdateProfileModal 
        visible={isProfileModalVisible}
        onClose={() => setIsProfileModalVisible(false)}
      />
      <ChangePasswordModal 
        visible={isPasswordModalVisible}
        onClose={() => setIsPasswordModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { paddingBottom: 40 },
  headerContainer: { padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginTop: 4 },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  rowLabel: { fontSize: 16 },
  arrow: { fontSize: 20 },
});