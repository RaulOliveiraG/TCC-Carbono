import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useThemeColors } from '@/styles/theme';
import { changePasswordSchema, ChangePasswordData } from '@/utils/validationSchemas';
import { authService } from '@/services/api';
import { Button } from '../common/Button';

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ visible, onClose }: ChangePasswordModalProps) {
  const colors = useThemeColors();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      senhaAtual: '',
      novaSenha: '',
      confirmacaoNovaSenha: '',
    },
  });

  const onSubmit = async (data: ChangePasswordData) => {
    setIsSubmitting(true);
    const response = await authService.changePassword(data);
    setIsSubmitting(false);

    if (response.success) {
      Alert.alert('Sucesso', 'Sua senha foi alterada.', [
        { text: 'OK', onPress: handleClose },
      ]);
    } else {
      Alert.alert('Erro', response.message || 'Não foi possível alterar a senha.');
    }
  };

  const handleClose = () => {
    reset();
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
          <Text style={[styles.title, { color: colors.textPrimary }]}>Alterar Senha</Text>

          <Text style={[styles.label, { color: colors.textPrimary }]}>Senha Atual</Text>
          <Controller
            control={control}
            name="senhaAtual"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.textPrimary }, errors.senhaAtual && styles.inputError]}
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.senhaAtual && <Text style={styles.errorText}>{errors.senhaAtual.message}</Text>}

          <Text style={[styles.label, { color: colors.textPrimary }]}>Nova Senha</Text>
          <Controller
            control={control}
            name="novaSenha"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.textPrimary }, errors.novaSenha && styles.inputError]}
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.novaSenha && <Text style={styles.errorText}>{errors.novaSenha.message}</Text>}

          <Text style={[styles.label, { color: colors.textPrimary }]}>Confirmar Nova Senha</Text>
          <Controller
            control={control}
            name="confirmacaoNovaSenha"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.textPrimary }, errors.confirmacaoNovaSenha && styles.inputError]}
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.confirmacaoNovaSenha && <Text style={styles.errorText}>{errors.confirmacaoNovaSenha.message}</Text>}

          <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={handleClose} variant="outline" />
            <Button title={isSubmitting ? 'Alterando...' : 'Alterar Senha'} onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
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