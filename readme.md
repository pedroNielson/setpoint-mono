# Setpoint Monorepo

Stack completa com React Native (Expo), Node.js (Express + Bun) e MongoDB Atlas, orquestrada com Turborepo e pnpm workspaces.

---

## Estrutura do projeto

```
setpoint-mono/
├── apps/
│   ├── mobile/          # Expo (React Native + Web)
│   └── api/             # Express rodando com Bun
├── packages/
│   ├── ui/              # Componentes React Native compartilhados
│   ├── types/           # Tipos TypeScript compartilhados
│   ├── db/              # Models Mongoose compartilhados
│   └── config/          # Configurações de eslint e tsconfig
├── turbo.json           # Configuração do Turborepo
├── pnpm-workspace.yaml  # Configuração dos workspaces
└── package.json         # Raiz do monorepo
```

---

## Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

| Ferramenta | Versão mínima | Download                      |
| ---------- | ------------- | ----------------------------- |
| Node.js    | 20.19.4 (LTS) | https://nodejs.org            |
| Git        | qualquer      | https://git-scm.com           |
| VS Code    | qualquer      | https://code.visualstudio.com |

> **Windows:** abra o PowerShell como Administrador para os passos de instalação.

---

## Instalação das ferramentas globais

### 1. Habilitar execução de scripts no Windows

Por padrão o Windows bloqueia scripts externos. Rode no PowerShell como Administrador:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Confirme digitando `S` quando solicitado.

### 2. Instalar o pnpm

```powershell
npm install -g pnpm
```

### 3. Instalar o Bun

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Feche e abra o terminal novamente após a instalação. Confirme que tudo está funcionando:

```powershell
pnpm --version
bun --version
node --version
```

Os três comandos devem retornar números de versão sem erros.

---

## Configuração do MongoDB Atlas

O projeto usa MongoDB Atlas como banco de dados na nuvem (free tier).

### 1. Criar conta e cluster

1. Acesse [cloud.mongodb.com](https://cloud.mongodb.com) e crie uma conta gratuita
2. Clique em **Create a cluster**
3. Escolha o plano **M0 Free**
4. Aguarde o cluster ser provisionado (leva cerca de 2 minutos)

### 2. Criar usuário do banco

1. No menu lateral, acesse **Security → Database & Network Access**
2. Clique em **Add New Database User**
3. Preencha:
   - **Username:** `setpoint`
   - **Password:** escolha uma senha simples, sem caracteres especiais (ex: `setpoint123`)
   - **Role:** Atlas Admin
4. Clique em **Add User**

> **Atenção:** evite caracteres especiais como `<`, `>`, `@` na senha — eles quebram a connection string.

### 3. Liberar acesso de rede

1. Na aba **Network Access**, clique em **Add IP Address**
2. Clique em **Allow Access from Anywhere** (para ambiente de desenvolvimento)
3. Confirme clicando em **Confirm**

### 4. Obter a connection string

1. Na tela do cluster, clique em **Connect**
2. Selecione **Drivers**
3. Copie a string no formato:
   ```
   mongodb+srv://setpoint:<password>@cluster0.xxxxx.mongodb.net/
   ```
4. Substitua `<password>` pela senha criada no passo anterior

---

## Configuração do projeto

### 1. Clonar o repositório

```powershell
git clone https://github.com/pedroNielson/setpoint-mono.git
cd setpoint-mono
```

### 2. Configurar variáveis de ambiente

Crie o arquivo `.env` dentro de `apps/api/`:

```powershell
New-Item apps/api/.env
```

Cole o conteúdo abaixo, substituindo pela sua connection string do Atlas:

```env
PORT=3001
MONGODB_URI=mongodb+srv://setpoint:SUA_SENHA@cluster0.xxxxx.mongodb.net/setpoint?retryWrites=true&w=majority
JWT_SECRET=setpoint_super_secret_dev_123
```

> **Nunca** suba o arquivo `.env` para o Git. Ele já está no `.gitignore`.

### 3. Instalar as dependências

Na raiz do projeto:

```powershell
pnpm install
```

O pnpm instala as dependências de todos os apps e packages de uma vez, graças ao workspace.

---

## Rodando o projeto

### Subir tudo junto (recomendado)

Na raiz do monorepo:

```powershell
pnpm dev
```

O Turborepo sobe a API e o Metro bundler do Expo em paralelo. No terminal você verá:

```
@setpoint/api:dev:    MongoDB conectado!
@setpoint/api:dev:    Usuário admin criado!
@setpoint/api:dev:    API rodando em http://localhost:3001
@setpoint/mobile:dev: Starting Metro Bundler
@setpoint/mobile:dev: Waiting on http://localhost:8081
```

### Abrir o app no navegador

Em um segundo terminal, navegue até o app mobile e rode:

```powershell
cd apps/mobile
pnpm web
```

O navegador abrirá automaticamente em `http://localhost:8082` com a tela de login.

### Verificar se a API está funcionando

Abra no navegador:

```
http://localhost:3001/health
```

Deve retornar:

```json
{ "status": "ok" }
```

---

## Credenciais padrão

Na primeira execução, a API cria automaticamente um usuário administrador:

| Campo   | Valor   |
| ------- | ------- |
| Usuário | `admin` |
| Senha   | `admin` |

> Altere essas credenciais antes de qualquer deploy em produção.

---

## Rotas da API

| Método | Rota          | Descrição                       | Auth |
| ------ | ------------- | ------------------------------- | ---- |
| GET    | `/health`     | Verifica se a API está no ar    | Não  |
| POST   | `/auth/login` | Autentica e retorna um JWT      | Não  |
| GET    | `/auth/me`    | Retorna dados do usuário logado | Sim  |

### Exemplo de login

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin"}'
```

Resposta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

### Exemplo de rota autenticada

```bash
curl http://localhost:3001/auth/me \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## Scripts disponíveis

Execute na raiz do monorepo:

| Comando      | O que faz                                               |
| ------------ | ------------------------------------------------------- |
| `pnpm dev`   | Sobe API + Metro em paralelo com hot reload             |
| `pnpm build` | Build de todos os apps (com cache incremental do Turbo) |
| `pnpm lint`  | Roda o linter em todos os packages                      |

Execute dentro de `apps/mobile`:

| Comando        | O que faz                             |
| -------------- | ------------------------------------- |
| `pnpm web`     | Abre o app no navegador               |
| `pnpm android` | Abre no emulador Android              |
| `pnpm ios`     | Abre no simulador iOS (somente macOS) |

---

## Solução de problemas comuns

### `pnpm` não é reconhecido após instalação

O Windows bloqueou a execução do script. Rode no PowerShell como Administrador:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Erro `Missing packageManager field in package.json`

O Turborepo 2.x exige a declaração do package manager no `package.json` raiz. Certifique-se de que o campo existe:

```json
"packageManager": "pnpm@10.0.0"
```

### Erro `bad auth: authentication failed` no MongoDB

A senha na connection string está incorreta ou contém caracteres especiais. Acesse o Atlas, edite o usuário e defina uma senha simples (apenas letras e números). Atualize o `.env` com a nova senha.

### Erro `DNSException: querySrv ENOTFOUND`

A connection string está malformatada. Verifique se o formato está correto:

```
mongodb+srv://USUARIO:SENHA@cluster0.xxxxx.mongodb.net/setpoint?retryWrites=true&w=majority
```

Pontos críticos: `:` entre usuário e senha, `@` antes do hostname, `/setpoint` antes do `?`.

### Metro não abre no navegador automaticamente

Abra manualmente em `http://localhost:8081` ou `http://localhost:8082`.

### O menu interativo do Metro não aparece no terminal

É esperado — o Turborepo captura o output dos processos filhos. Para acessar o menu interativo do Metro (QR code, reload, etc.), rode o Expo diretamente em um terminal separado:

```powershell
cd apps/mobile
pnpm dev
```

---

## Tecnologias utilizadas

| Camada    | Tecnologia                         |
| --------- | ---------------------------------- |
| Monorepo  | Turborepo + pnpm workspaces        |
| Frontend  | React Native + Expo (web e mobile) |
| Backend   | Node.js + Express + Bun (runtime)  |
| Banco     | MongoDB Atlas (Mongoose)           |
| Auth      | JWT + bcryptjs                     |
| Linguagem | TypeScript (full stack)            |
