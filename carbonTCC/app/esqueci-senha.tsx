import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { esqueciSenhaSchema, EsqueciSenhaData } from '@/utils/validationSchemas';
import { lightThemeColors as colors } from '@/styles/theme';
import { authService } from '@/services/api';

export default function EsqueciSenhaScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(esqueciSenhaSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: EsqueciSenhaData) => {
    setIsLoading(true);
    try {
      const response = await authService.solicitarRecuperacaoSenha(data);
      if (response.success) {
        setIsSuccess(true);
      } else {
        // Embora nosso backend sempre retorne sucesso, tratamos o caso de falha por robustez
        Alert.alert('Erro', response.message || 'Não foi possível processar sua solicitação.');
      }
    } catch (error) {
      Alert.alert('Erro de Conexão', 'Não foi possível se conectar ao servidor. Verifique sua internet.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <LinearGradient
            colors={['#2E7D32', '#4CAF50', '#81C784']}
            style={styles.gradient}
          >
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.title}>Recuperar Senha</Text>
                <Text style={styles.subtitle}>
                  {isSuccess
                    ? 'Verifique sua caixa de entrada.'
                    : 'Digite seu e-mail para receber o link de recuperação.'}
                </Text>
              </View>

              {isSuccess ? (
                <View style={styles.successContainer}>
                  <Text style={styles.successText}>
                    Se uma conta com o e-mail fornecido existir, um link para redefinição de senha foi enviado.
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.replace({ pathname: '/login' })}
                  >
                    <Text style={styles.buttonText}>Voltar para o Login</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.form}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={[styles.input, errors.email && styles.inputError]}
                          placeholder="Digite seu email"
                          placeholderTextColor="#999"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                        />
                      )}
                    />
                    {errors.email && (
                      <Text style={styles.errorText}>{errors.email.message}</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Enviar Link</Text>
                    )}
                  </TouchableOpacity>

                  <View style={styles.footer}>
                    <TouchableOpacity onPress={() => router.back()}>
                      <Text style={styles.linkText}>Voltar para o Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1 },
  gradient: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  header: { alignItems: 'center', marginBottom: 48 },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.white, marginBottom: 8 },
  subtitle: { fontSize: 16, color: colors.primaryLighter, textAlign: 'center' },
  form: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: { borderColor: '#f44336' },
  errorText: { color: '#f44336', fontSize: 14, marginTop: 4 },
  button: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: colors.white, fontSize: 18, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  linkText: { fontSize: 16, color: '#2E7D32', fontWeight: '600' },
  successContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  successText: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
});