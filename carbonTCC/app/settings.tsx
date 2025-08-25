import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Header } from '@/components/layout/Header';
import { useThemeStore } from '@/stores/themeStore';
import { useThemeColors } from '@/styles/theme';
import { useAuth } from '@/contexts/AuthProvider';
import { updateProfileSchema, UpdateProfileData } from '@/utils/validationSchemas';
import { authService } from '@/services/api';
import { Button } from '@/components/common/Button';
import { ChangePasswordModal } from '@/components/settings/ChangePasswordModal'; 

export default function SettingsScreen() {
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const colors = useThemeColors();
  const { user, setUser } = useAuth();
  const isDarkTheme = theme === 'dark';
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      nome: user?.nome || '',
      telefone: user?.telefone || '',
    },
  });

  const onProfileSubmit = async (data: UpdateProfileData) => {
    setIsSubmitting(true);
    const response = await authService.updateProfile(data);
    setIsSubmitting(false);

    if (response.success && response.usuario) {
      setUser(response.usuario);
      Alert.alert('Sucesso', 'Seu perfil foi atualizado.');
    } else {
      Alert.alert('Erro', response.message || 'Não foi possível atualizar o perfil.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.headerContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Configurações</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Gerencie seu perfil e preferências.</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Perfil</Text>
        <TouchableOpacity 
          style={[styles.row, { borderBottomColor: colors.border }]}
          onPress={() => setIsPasswordModalVisible(true)}
        >
          <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>Alterar Senha</Text>
          <Text style={[styles.arrow, { color: colors.textSecondary }]}>›</Text>
        </TouchableOpacity>
          
          <View style={styles.formContainer}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>Nome Completo</Text>
            <Controller
              control={control}
              name="nome"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.textPrimary }, errors.nome && styles.inputError]}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}

            <Text style={[styles.label, { color: colors.textPrimary, marginTop: 16 }]}>Telefone</Text>
            <Controller
              control={control}
              name="telefone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.textPrimary }, errors.telefone && styles.inputError]}
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.telefone && <Text style={styles.errorText}>{errors.telefone.message}</Text>}

            <Button
              title={isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
              onPress={handleSubmit(onProfileSubmit)}
              style={{ marginTop: 20 }}
              disabled={!isDirty || isSubmitting}
            />
          </View>

          <TouchableOpacity style={[styles.row, { borderBottomColor: colors.border }]}>
            <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>Alterar Senha</Text>
            <Text style={[styles.arrow, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>
        </View>

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
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  formContainer: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputError: { borderColor: '#f44336' },
  errorText: { color: '#f44336', fontSize: 14, marginTop: 4 },
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