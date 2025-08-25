import { LoginData, RegistroData } from "@/utils/validationSchemas";

export enum TipoUsuario {
  INVESTIDOR = 'INVESTIDOR',
  EMPRESA_COMPRADORA = 'EMPRESA_COMPRADORA',
  // --- INÍCIO DA MODIFICAÇÃO ---
  // Corrigimos o erro de digitação de 'PROPRIETario_TERRA' para 'PROPRIETARIO_TERRA'
  PROPRIETARIO_TERRA = 'PROPRIETARIO_TERRA',
  // --- FIM DA MODIFICAÇÃO ---
  ADMIN = 'ADMIN'
}

export enum StatusConta {
  ATIVO = 'ATIVO',
  PENDENTE_VERIFICACAO = 'PENDENTE_VERIFICACAO',
  SUSPENSO = 'SUSPENSO',
  INATIVO = 'INATIVO'
}

export enum TipoPessoa {
  FISICA = 'FISICA',
  JURIDICA = 'JURIDICA'
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: TipoUsuario;
  statusConta: StatusConta;
  tipoPessoa: TipoPessoa;
  cpf?: string;
  cnpj?: string;
  razaoSocial?: string;
  telefone?: string;
  dataNascimento?: string;
  enderecoCarteiraBlockchain?: string;
  ultimoLogin?: string;
  dataCriacao: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  usuario?: Usuario;
}

export interface AuthContextType {
  user: Usuario | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<AuthResponse>;
  register: (data: RegistroData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  setUser: (user: Usuario | null) => void;
}

export type { LoginData, RegistroData };