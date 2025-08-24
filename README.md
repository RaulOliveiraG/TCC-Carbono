# Sistema de Autenticação - Carbon Credit App

Este projeto implementa um sistema completo de autenticação para o aplicativo móvel de créditos de carbono, incluindo:

- **Backend**: API em .NET Core 8.0 com SQL Server
- **Frontend**: Aplicativo React Native com TypeScript

## Estrutura do Projeto

```
/
├── backend/
│   └── CarbonCredit.AuthAPI/     # API .NET Core
├── carbonTCC/                    # App React Native
└── README.md                     # Este arquivo
```

## Backend (.NET Core API)

### Pré-requisitos

- .NET 8.0 SDK
- SQL Server (LocalDB ou instância completa)
- Visual Studio ou VS Code (opcional)

### Configuração

1. **Instalar dependências**:
   ```bash
   cd backend/CarbonCredit.AuthAPI
   dotnet restore
   ```

2. **Configurar banco de dados**:
   - Edite `appsettings.json` para ajustar a connection string do SQL Server
   - Por padrão, está configurado para usar LocalDB

3. **Executar a API**:
   ```bash
   dotnet run
   ```
   
   A API estará disponível em: `http://localhost:5000`

### Endpoints Disponíveis

- `POST /api/auth/registro` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/usuario-existe?email={email}` - Verificar se usuário existe

### Estrutura do Banco de Dados

A tabela `usuarios` será criada automaticamente com os seguintes campos:

- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `nome` (VARCHAR(255), NOT NULL)
- `email` (VARCHAR(255), NOT NULL, UNIQUE)
- `senha` (VARCHAR(255), NOT NULL) - Hash da senha
- `tipo_usuario` (ENUM: INVESTIDOR, EMPRESA_COMPRADORA, PROPRIETARIO_TERRA, ADMIN)
- `status_conta` (ENUM: ATIVO, PENDENTE_VERIFICACAO, SUSPENSO, INATIVO)
- `tipo_pessoa` (ENUM: FISICA, JURIDICA)
- `cpf` (VARCHAR(11), UNIQUE) - Para pessoa física
- `cnpj` (VARCHAR(14), UNIQUE) - Para pessoa jurídica
- `razao_social` (VARCHAR(255)) - Para pessoa jurídica
- `telefone` (VARCHAR(20))
- `data_nascimento` (DATE) - Para pessoa física
- `endereco_carteira_blockchain` (VARCHAR(42), UNIQUE)
- `documento_verificacao_url` (VARCHAR(512))
- `ultimo_login` (DATETIME)
- `data_criacao` (TIMESTAMP)
- `data_atualizacao` (TIMESTAMP)

## Frontend (React Native)

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI
- Emulador Android/iOS ou dispositivo físico

### Configuração

1. **Instalar dependências**:
   ```bash
   cd carbonTCC
   npm install
   ```

2. **Configurar URL da API**:
   - Edite `src/services/api.ts`
   - Altere `API_BASE_URL` para o endereço da sua API
   - Para desenvolvimento local: `http://localhost:5000/api`
   - Para dispositivo físico: `http://SEU_IP:5000/api`

3. **Executar o app**:
   ```bash
   npm start
   ```

### Funcionalidades Implementadas

#### Telas de Autenticação

1. **Tela Inicial** (`/`)
   - Opções para Login, Registro ou continuar como visitante
   - Verifica automaticamente se o usuário já está logado

2. **Tela de Login** (`/login`)
   - Formulário com email e senha
   - Validação de campos
   - Armazenamento seguro do token JWT

3. **Tela de Registro** (`/registro`)
   - Formulário completo com todos os campos da tabela
   - Validação dinâmica baseada no tipo de pessoa (Física/Jurídica)
   - Validação de CPF/CNPJ
   - Suporte a diferentes tipos de usuário

#### Recursos Técnicos

- **Gerenciamento de Estado**: Context API com AsyncStorage
- **Validação**: React Hook Form + Yup
- **Navegação**: Expo Router
- **UI**: Componentes nativos com gradientes
- **Segurança**: Armazenamento seguro de tokens
- **Interceptors**: Axios para gerenciar tokens automaticamente

## Configuração para Desenvolvimento

### Executando Localmente

1. **Inicie o backend**:
   ```bash
   cd backend/CarbonCredit.AuthAPI
   dotnet run
   ```

2. **Em outro terminal, inicie o frontend**:
   ```bash
   cd carbonTCC
   npm start
   ```

3. **Configure o IP da API no frontend**:
   - Se estiver usando dispositivo físico, substitua `localhost` pelo IP da sua máquina
   - Exemplo: `http://192.168.1.100:5000/api`

### Testando a Integração

1. Abra o app no emulador ou dispositivo
2. Tente criar uma nova conta
3. Faça login com as credenciais criadas
4. Verifique se o token é armazenado corretamente

## Estrutura de Dados

### Tipos de Usuário
- `INVESTIDOR`: Usuários que investem em projetos de carbono
- `EMPRESA_COMPRADORA`: Empresas que compram créditos de carbono
- `PROPRIETARIO_TERRA`: Proprietários de terra que geram créditos
- `ADMIN`: Administradores do sistema

### Tipos de Pessoa
- `FISICA`: Pessoa física (requer CPF)
- `JURIDICA`: Pessoa jurídica (requer CNPJ)

### Status da Conta
- `ATIVO`: Conta ativa e verificada
- `PENDENTE_VERIFICACAO`: Conta criada, aguardando verificação
- `SUSPENSO`: Conta temporariamente suspensa
- `INATIVO`: Conta desativada

## Segurança

- Senhas são criptografadas com BCrypt
- Tokens JWT com expiração configurável
- Validação de dados no frontend e backend
- CORS configurado para desenvolvimento
- Interceptors para renovação automática de tokens

## Próximos Passos

1. Implementar verificação de email
2. Adicionar recuperação de senha
3. Implementar upload de documentos de verificação
4. Adicionar testes unitários e de integração
5. Configurar CI/CD para deploy automático

## Troubleshooting

### Problemas Comuns

1. **Erro de conexão com a API**:
   - Verifique se a API está rodando
   - Confirme o IP/URL correto no frontend
   - Verifique se o CORS está configurado

2. **Erro de banco de dados**:
   - Verifique a connection string
   - Confirme se o SQL Server está rodando
   - Verifique permissões de acesso

3. **Problemas no React Native**:
   - Limpe o cache: `npm start -- --clear`
   - Reinstale dependências: `rm -rf node_modules && npm install`
   - Verifique se todas as dependências estão instaladas

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Implemente as mudanças
4. Teste localmente
5. Submeta um pull request

## Licença

Este projeto é parte do TCC e está sob licença acadêmica.

"# TCC-Carbono" 
