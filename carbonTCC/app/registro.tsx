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
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthProvider';
import { TipoUsuario, TipoPessoa } from '@/types/auth';
import { registroSchema, RegistroData } from '@/utils/validationSchemas';
import { lightThemeColors as colors } from '@/styles/theme';

export default function RegistroScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ 
    resolver: yupResolver(registroSchema),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      confirmacaoSenha: '',
      tipoUsuario: TipoUsuario.INVESTIDOR,
      tipoPessoa: TipoPessoa.FISICA,
      cpf: '',
      cnpj: '',
      razaoSocial: '',
      telefone: '',
      dataNascimento: '',
      enderecoCarteiraBlockchain: '',
    },
  });

  const tipoPessoa = watch('tipoPessoa');

  const onSubmit = async (data: RegistroData) => {
    setIsLoading(true);
    try {
      const response = await register(data);
      if (response.success) {
        // A navegação para home já é tratada pelo AuthProvider/SplashScreen
      } else {
        Alert.alert('Erro no Registro', response.message || 'Não foi possível criar a conta.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCPF = (value: string) => value.replace(/\D/g, '').slice(0, 11);
  const formatCNPJ = (value: string) => value.replace(/\D/g, '').slice(0, 14);
  const formatPhone = (value: string) => value.replace(/\D/g, '').slice(0, 11);

  return (
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
              <Text style={styles.title}>Carbon Credit</Text>
              <Text style={styles.subtitle}>Crie sua conta</Text>
            </View>

            <View style={styles.form}>
              {/* Nome */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome *</Text>
                <Controller
                  control={control}
                  name="nome"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.nome && styles.inputError]}
                      placeholder="Digite seu nome completo"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                {errors.nome && (
                  <Text style={styles.errorText}>{errors.nome.message}</Text>
                )}
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email *</Text>
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

              {/* Senha */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha *</Text>
                <Controller
                  control={control}
                  name="senha"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.senha && styles.inputError]}
                      placeholder="Digite sua senha"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry
                    />
                  )}
                />
                {errors.senha && (
                  <Text style={styles.errorText}>{errors.senha.message}</Text>
                )}
              </View>

              {/* Confirmação de Senha */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmar Senha *</Text>
                <Controller
                  control={control}
                  name="confirmacaoSenha"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.confirmacaoSenha && styles.inputError]}
                      placeholder="Confirme sua senha"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry
                    />
                  )}
                />
                {errors.confirmacaoSenha && (
                  <Text style={styles.errorText}>{errors.confirmacaoSenha.message}</Text>
                )}
              </View>

              {/* Tipo de Usuário */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Tipo de Usuário *</Text>
                <Controller
                  control={control}
                  name="tipoUsuario"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        style={styles.picker}
                      >
                        <Picker.Item label="Investidor" value={TipoUsuario.INVESTIDOR} />
                        <Picker.Item label="Empresa Compradora" value={TipoUsuario.EMPRESA_COMPRADORA} />
                        <Picker.Item label="Proprietário de Terra" value={TipoUsuario.PROPRIETARIO_TERRA} />
                      </Picker>
                    </View>
                  )}
                />
              </View>

              {/* Tipo de Pessoa */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Tipo de Pessoa *</Text>
                <Controller
                  control={control}
                  name="tipoPessoa"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        style={styles.picker}
                      >
                        <Picker.Item label="Pessoa Física" value={TipoPessoa.FISICA} />
                        <Picker.Item label="Pessoa Jurídica" value={TipoPessoa.JURIDICA} />
                      </Picker>
                    </View>
                  )}
                />
              </View>

              {/* CPF - apenas para pessoa física */}
              {tipoPessoa === TipoPessoa.FISICA && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>CPF *</Text>
                  <Controller
                    control={control}
                    name="cpf"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[styles.input, errors.cpf && styles.inputError]}
                        placeholder="Digite seu CPF (apenas números)"
                        placeholderTextColor="#999"
                        value={value}
                        onChangeText={(text) => onChange(formatCPF(text))}
                        onBlur={onBlur}
                        keyboardType="numeric"
                        maxLength={11}
                      />
                    )}
                  />
                  {errors.cpf && (
                    <Text style={styles.errorText}>{errors.cpf.message}</Text>
                  )}
                </View>
              )}

              {/* CNPJ - apenas para pessoa jurídica */}
              {tipoPessoa === TipoPessoa.JURIDICA && (
                <>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>CNPJ *</Text>
                    <Controller
                      control={control}
                      name="cnpj"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={[styles.input, errors.cnpj && styles.inputError]}
                          placeholder="Digite o CNPJ (apenas números)"
                          placeholderTextColor="#999"
                          value={value}
                          onChangeText={(text) => onChange(formatCNPJ(text))}
                          onBlur={onBlur}
                          keyboardType="numeric"
                          maxLength={14}
                        />
                      )}
                    />
                    {errors.cnpj && (
                      <Text style={styles.errorText}>{errors.cnpj.message}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Razão Social</Text>
                    <Controller
                      control={control}
                      name="razaoSocial"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={[styles.input, errors.razaoSocial && styles.inputError]}
                          placeholder="Digite a razão social"
                          placeholderTextColor="#999"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                        />
                      )}
                    />
                    {errors.razaoSocial && (
                      <Text style={styles.errorText}>{errors.razaoSocial.message}</Text>
                    )}
                  </View>
                </>
              )}

              {/* Telefone */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Telefone</Text>
                <Controller
                  control={control}
                  name="telefone"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.telefone && styles.inputError]}
                      placeholder="Digite seu telefone"
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={(text) => onChange(formatPhone(text))}
                      onBlur={onBlur}
                      keyboardType="phone-pad"
                    />
                  )}
                />
                {errors.telefone && (
                  <Text style={styles.errorText}>{errors.telefone.message}</Text>
                )}
              </View>

              {/* Data de Nascimento - apenas para pessoa física */}
              {tipoPessoa === TipoPessoa.FISICA && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Data de Nascimento</Text>
                  <Controller
                    control={control}
                    name="dataNascimento"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[styles.input, errors.dataNascimento && styles.inputError]}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor="#999"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {errors.dataNascimento && (
                    <Text style={styles.errorText}>{errors.dataNascimento.message}</Text>
                  )}
                </View>
              )}

              {/* Endereço da Carteira Blockchain */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Endereço da Carteira Blockchain</Text>
                <Controller
                  control={control}
                  name="enderecoCarteiraBlockchain"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors.enderecoCarteiraBlockchain && styles.inputError]}
                      placeholder="0x..."
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  )}
                />
                {errors.enderecoCarteiraBlockchain && (
                  <Text style={styles.errorText}>{errors.enderecoCarteiraBlockchain.message}</Text>
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
                  <Text style={styles.buttonText}>Cadastrar</Text>
                )}
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Já tem uma conta? </Text>
                <TouchableOpacity onPress={() => router.push({ pathname: '/login' })}>
                  <Text style={styles.linkText}>Faça login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.primaryLighter,
    textAlign: 'center',
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#f44336',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
  },
  errorText: {
    color: '#f44336',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '600',
  },
});