# Digital Signature Platform

Protótipo de uma aplicação de gerenciamento e assinatura digital de documentos, desenvolvido como parte de um teste técnico para vaga de Desenvolvedor Frontend.

## 🚀 Tecnologias Utilizadas

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS + shadcn/ui**
- **NextAuth.js (v4)**
- **Prisma ORM**
- **SQLite** (banco local)
- **React Hook Form + Zod**

---

## 📦 Instalação e Execução

1. **Clone o repositório:**

```bash
git clone https://github.com/lucasrguidi/digital-signature.git
cd digital-signature
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o banco de dados:**

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. **Crie um arquivo `.env` com base no `.env.example`:**

```bash
cp .env.example .env
```

> Atualize o arquivo `.env` com suas credenciais (ver seção abaixo para configurar o GitHub OAuth).

5. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

---

## 🔐 Configuração do OAuth com GitHub

Para usar login com GitHub, você precisa criar uma aplicação OAuth no GitHub:

1. Vá para [GitHub Developer Settings](https://github.com/settings/developers).
2. Clique em **"New OAuth App"**.
3. Preencha:
   - **Application name**: Digital Signature
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Após criar, copie o `Client ID` e `Client Secret`.
5. Atualize o arquivo `.env` com essas informações:

```
GITHUB_ID=your-client-id
GITHUB_SECRET=your-client-secret
```

---

## 📚 Arquitetura e Estrutura

A aplicação segue uma estrutura modular dentro da pasta `src/`:

| Pasta         | Descrição                                  |
| ------------- | ------------------------------------------ |
| `app/`        | Rotas e páginas (Next.js App Router)       |
| `components/` | Componentes reutilizáveis da UI            |
| `schemas/`    | Schemas de validação Zod                   |
| `lib/`        | Configurações globais (auth, prisma, etc.) |
| `services/`   | Funções para consumo das APIs              |
| `hooks/`      | Hooks customizados                         |
| `utils/`      | Utilidades diversas                        |
| `prisma/`     | Schema e migrations do banco de dados      |

---

## ✅ Funcionalidades Implementadas

### 1. **Autenticação**

- Login com e-mail/senha
- Login via GitHub
- Registro de usuários
- Proteção de rotas privadas
- Logout
- Sessão persistente com NextAuth

### 2. **Gerenciamento de Documentos**

- Upload de documentos (PDF)
- Visualização (PDF renderizado)
- Listagem por usuário
- Exclusão de documentos

### 3. **Assinatura Digital (Simulada)**

- Interface de assinatura com canvas
- Registro da assinatura como imagem
- Timestamp da assinatura
- Alteração do status: `PENDING` → `SIGNED`

---

## ⚠️ Desafios Enfrentados

- **Persistência de arquivos**: ao invés de persistir os arquivos no banco de dados, optei por salvá-los no diretório local /public/uploads com fs.promises.writeFile, o que é mais leve e eficiente para servir PDFs diretamente via frontend.
- **Visualização dos PDFs**: usei a tag <embed> apontando para o caminho local do arquivo (/uploads/{filename}), permitindo renderização nativa do PDF no navegador sem precisar de bibliotecas externas.
- **Assinatura simplificada**: para simulação rápida, utilizei uma biblioteca simles que permite assinar e converter a assinatura em imagem.

---

## 📄 Observações Finais

- A aplicação está 100% funcional localmente.
- O projeto foi construído com foco em clareza de código, organização e boas práticas modernas do ecossistema React/Next.js.

---
