# Digital Signature Platform

Protótipo de uma aplicação de gerenciamento e assinatura digital de documentos.
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

- **Persistência de arquivos**: optei por salvar os arquivos localmente no diretório /public/uploads usando fs.promises.writeFile, em vez de persistir os PDFs no banco de dados. Essa abordagem simplifica a solução, evitando a necessidade de configurar um serviço externo de armazenamento (como S3, Firebase, etc.), além de permitir que os arquivos sejam servidos diretamente pelo frontend de forma eficiente.
- **Visualização dos PDFs**: para exibir os documentos, utilizei a tag HTML <embed> apontando diretamente para o caminho do arquivo (/uploads/{filename}). Isso permite a renderização nativa dos PDFs no navegador, sem depender de bibliotecas externas. A abordagem é leve, funcional e aproveita recursos já suportados pelos principais navegadores.
- **Assinatura simplificada**: para simular a assinatura de documentos, utilizei a biblioteca react-signature-canvas, que permite desenhar a assinatura com o mouse (ou toque) e exportá-la como imagem. Isso facilitou a implementação de uma interface interativa e visualmente próxima de uma assinatura real, sem complexidade adicional.
---

## 📄 Observações Finais

- A aplicação está 100% funcional localmente.
- O projeto foi construído com foco em clareza de código, organização e boas práticas modernas do ecossistema React/Next.js.

---
