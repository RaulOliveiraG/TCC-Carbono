import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useThemeColors } from '@/styles/theme';
import { useAuth } from '@/contexts/AuthProvider';
import { updateProfileSchema, UpdateProfileData } from '@/utils/validationSchemas';
import { authService } from '@/services/api';
import { Button } from '../common/Button';

interface UpdateProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export function UpdateProfileModal({ visible, onClose }: UpdateProfileModalProps) {
  const colors = useThemeColors();
  const { user, setUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      nome: user?.nome || '',
      telefone: user?.telefone || '',
    },
  });

  const onSubmit = async (data: UpdateProfileData) => {
    setIsSubmitting(true);
    const response = await authService.updateProfile(data);
    setIsSubmitting(false);

    if (response.success && response.usuario) {
      setUser(response.usuario);
      Alert.alert('Sucesso', 'Seu perfil foi atualizado.', [
        { text: 'OK', onPress: handleClose },
      ]);
    } else {
      Alert.alert('Erro', response.message || 'Não foi possível atualizar o perfil.');
    }
  };

  const handleClose = () => {
    reset({ nome: user?.nome, telefone: user?.telefone });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Alterar Perfil</Text>

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

          <Text style={[styles.label, { color: colors.textPrimary }]}>Telefone</Text>
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

          <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={handleClose} variant="outline" />
            <Button title={isSubmitting ? 'Salvando...' : 'Salvar'} onPress={handleSubmit(onSubmit)} disabled={!isDirty || isSubmitting} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#f44336',
  },
  errorText: {
    color: '#f44336',
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 10,
  },
});