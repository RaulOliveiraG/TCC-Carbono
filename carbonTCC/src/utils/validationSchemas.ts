import * as yup from 'yup';
import { TipoUsuario, TipoPessoa } from '../types/auth';

export const redefinirSenhaSchema = yup.object({
  token: yup
    .string()
    .required('O token é obrigatório.'),
  email: yup
    .string()
    .email('Email deve ter um formato válido')
    .required('Email é obrigatório'),
  novaSenha: yup
    .string()
    .required('Nova senha é obrigatória')
    .min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
  confirmacaoNovaSenha: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('novaSenha')], 'As senhas não coincidem'),
}).required();

export type RedefinirSenhaData = yup.InferType<typeof redefinirSenhaSchema>;

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Email deve ter um formato válido')
    .required('Email é obrigatório'),
  senha: yup
    .string()
    .required('Senha é obrigatória'),
}).required();

export type LoginData = yup.InferType<typeof loginSchema>;

export const changePasswordSchema = yup.object({
  senhaAtual: yup
    .string()
    .required('Senha atual é obrigatória'),
  novaSenha: yup
    .string()
    .required('Nova senha é obrigatória')
    .min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
  confirmacaoNovaSenha: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('novaSenha')], 'As senhas não coincidem'),
}).required();

export type ChangePasswordData = yup.InferType<typeof changePasswordSchema>;

export const updateProfileSchema = yup.object({
  nome: yup
    .string()
    .required('Nome é obrigatório')
    .max(255, 'Nome deve ter no máximo 255 caracteres'),
  telefone: yup
    .string()
    .nullable()
    .max(20, 'Telefone deve ter no máximo 20 caracteres'),
}).required();

export type UpdateProfileData = yup.InferType<typeof updateProfileSchema>;

export const registroSchema = yup.object({
  nome: yup
    .string()
    .required('Nome é obrigatório')
    .max(255, 'Nome deve ter no máximo 255 caracteres'),
  email: yup
    .string()
    .email('Email deve ter um formato válido')
    .required('Email é obrigatório')
    .max(255, 'Email deve ter no máximo 255 caracteres'),
  senha: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .max(255, 'Senha deve ter no máximo 255 caracteres'),
  confirmacaoSenha: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('senha')], 'Senha e confirmação devem ser iguais'),
  tipoUsuario: yup
    .mixed<TipoUsuario>()
    .oneOf(Object.values(TipoUsuario), 'Tipo de usuário inválido')
    .required('Tipo de usuário é obrigatório'),
  tipoPessoa: yup
    .mixed<TipoPessoa>()
    .oneOf(Object.values(TipoPessoa), 'Tipo de pessoa inválido')
    .required('Tipo de pessoa é obrigatório'),
  cpf: yup
    .string()
    .when('tipoPessoa', {
      is: TipoPessoa.FISICA,
      then: (schema) => schema
        .required('CPF é obrigatório para pessoa física')
        .matches(/^\d{11}$/, 'CPF deve conter exatamente 11 dígitos'),
      otherwise: (schema) => schema.optional().nullable(),
    }),
  cnpj: yup
    .string()
    .when('tipoPessoa', {
      is: TipoPessoa.JURIDICA,
      then: (schema) => schema
        .required('CNPJ é obrigatório para pessoa jurídica')
        .matches(/^\d{14}$/, 'CNPJ deve conter exatamente 14 dígitos'),
      otherwise: (schema) => schema.optional().nullable(),
    }),
  razaoSocial: yup
    .string()
    .optional()
    .nullable()
    .when('tipoPessoa', {
      is: TipoPessoa.JURIDICA,
      then: (schema) => schema.max(255, 'Razão social deve ter no máximo 255 caracteres'),
    }),
  telefone: yup
    .string()
    .optional()
    .nullable()
    .max(20, 'Telefone deve ter no máximo 20 caracteres'),
  dataNascimento: yup
    .string()
    .optional()
    .nullable()
    .when('tipoPessoa', {
      is: TipoPessoa.FISICA,
      then: (schema) => schema.matches(
        /^\d{4}-\d{2}-\d{2}$/,
        'Data de nascimento deve estar no formato YYYY-MM-DD'
      ),
    }),
  enderecoCarteiraBlockchain: yup
    .string()
    .optional()
    .nullable()
    .max(42, 'Endereço da carteira deve ter no máximo 42 caracteres')
    .matches(/^0x[a-fA-F0-9]{40}$|^$/, 'Endereço da carteira deve ser um endereço Ethereum válido'),
}).required();

export type RegistroData = yup.InferType<typeof registroSchema>;

export const esqueciSenhaSchema = yup.object({
  email: yup
    .string()
    .email('Email deve ter um formato válido')
    .required('Email é obrigatório'),
}).required();

export type EsqueciSenhaData = yup.InferType<typeof esqueciSenhaSchema>;

export const validarCPF = (cpf: string): boolean => {
  if (!cpf || cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;
  return true;
};

export const validarCNPJ = (cnpj: string): boolean => {
  if (!cnpj || cnpj.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(1))) return false;
  return true;
};