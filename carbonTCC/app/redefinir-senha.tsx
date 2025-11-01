import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { redefinirSenhaSchema, RedefinirSenhaData } from '@/utils/validationSchemas';
import { authService } from '@/services/api';
import { lightThemeColors as colors } from '@/styles/theme';

export default function RedefinirSenhaScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ token?: string; email?: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RedefinirSenhaData>({
    resolver: yupResolver(redefinirSenhaSchema),
    defaultValues: {
      token: '',
      email: '',
      novaSenha: '',
      confirmacaoNovaSenha: '',
    },
  });

  useEffect(() => {
    if (params.token) {
      setValue('token', params.token);
    }
    if (params.email) {
      setValue('email', params.email);
    }
  }, [params, setValue]);

  const onSubmit = async (data: RedefinirSenhaData) => {
    setIsLoading(true);
    try {
      const response = await authService.redefinirSenha(data);
      if (response.success) {
        Alert.alert('Sucesso!', 'Sua senha foi redefinida. Você já pode fazer o login.', [
          { text: 'OK', onPress: () => router.replace({ pathname: '/login' }) },
        ]);
      } else {
        Alert.alert('Erro', response.message || 'Não foi possível redefinir a senha. O token pode ser inválido ou ter expirado.');
      }
    } catch (error) {
      Alert.alert('Erro de Conexão', 'Não foi possível se conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient colors={['#2E7D32', '#4CAF50', '#81C784']} style={styles.gradient}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Crie uma Nova Senha</Text>
            </View>

            <View style={styles.form}>
              <Controller
                control={control}
                name="token"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Token de Recuperação"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    editable={false} 
                  />
                )}
              />
              {errors.token && <Text style={styles.errorText}>{errors.token.message}</Text>}

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                  />
                )}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

              <Controller
                control={control}
                name="novaSenha"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Digite a nova senha"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                  />
                )}
              />
              {errors.novaSenha && <Text style={styles.errorText}>{errors.novaSenha.message}</Text>}

              <Controller
                control={control}
                name="confirmacaoNovaSenha"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Confirme a nova senha"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                  />
                )}
              />
              {errors.confirmacaoNovaSenha && <Text style={styles.errorText}>{errors.confirmacaoNovaSenha.message}</Text>}

              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Redefinir Senha</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  gradient: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  header: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.white, textAlign: 'center' },
  form: { backgroundColor: colors.white, borderRadius: 16, padding: 24 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  },
  errorText: { color: '#f44336', fontSize: 14, marginTop: -12, marginBottom: 10, marginLeft: 4 },
  button: { backgroundColor: '#2E7D32', borderRadius: 8, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: colors.white, fontSize: 18, fontWeight: '600' },
});