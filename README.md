# 🛡️ ShieldUp: Plataforma de Denúncias Contra o Bullying

O ShieldUp é uma ferramenta digital desenvolvida para oferecer um ambiente seguro e anônimo (ou identificado) para a denúncia de casos de bullying. Nosso objetivo é dar voz às vítimas e testemunhas, criando um mapa de ocorrências que ajude instituições a agir de forma preventiva.

## 🚀 Visão Geral do Projeto
A plataforma permite que usuários relatem incidentes de bullying de forma detalhada, anexando informações relevantes. Além disso, o site promove a conscientização ao exibir um feed de denúncias públicas, permitindo que a comunidade entenda a gravidade e a recorrência desses eventos.

### Principais Funcionalidades
- **Envio de Denúncias**: Formulário intuitivo com categorias de bullying (físico, verbal, social, cyberbullying).
- **Feed de Ocorrências**: Visualização de denúncias postadas para dar visibilidade ao problema.
- **Filtros de Busca**: Filtragem por data, tipo de bullying ou localidade.
- **Painel Administrativo (Opcional)**: Para moderação e análise das denúncias recebidas.

## 🛠️ Arquitetura Técnica
O projeto é dividido em dois repositórios (ou pastas) principais:

### 🎨 Frontend (Interface do Usuário)
Focado em acessibilidade, rapidez e uma experiência de usuário (UX) acolhedora.
- **Framework**: Next.js (com React).
- **Estilização**: Tailwind CSS.
- **Gerenciamento de Estado**: React Hooks (State, Context).
- **Consumo de API**: Fetch API.

### ⚙️ Backend (Servidor e Banco de Dados)
Focado em segurança de dados e integridade das informações.
- **Linguagem/Ambiente**: Node.js com Express.
- **Banco de Dados**: MongoDB (Mongoose).
- **Autenticação**: JWT (JSON Web Tokens).

## 📂 Estrutura de Pastas
```
shieldup/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Lógica das rotas
│   │   ├── models/        # Esquemas do banco de dados
│   │   ├── routes/        # Definição dos endpoints
│   │   └── middleware/    # Filtros de segurança/autenticação
│   ├── .env               # Variáveis de ambiente
│   └── server.js          # Ponto de entrada
├── frontend/
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── app/           # Páginas da aplicação (App Router)
│   │   └── lib/           # Serviços e integrações com API
│   ├── tailwind.config.js # Configuração do Tailwind CSS
│   └── package.json
└── README.md
```

## 🏁 Como Rodar o Projeto

**1. Clone o repositório**
```bash
git clone <url-do-repositorio>
cd ShieldUp
```

**2. Rodando o Servidor (Backend)**
```bash
cd backend
npm install
npm run dev
```
*Configure as variáveis de ambiente no arquivo `.env` dentro da pasta backend.*

**3. Rodando o Cliente (Frontend)**
```bash
cd frontend
npm install
npm run dev
```

*Frontend rodará em http://localhost:3000 e Backend na porta configurada (ex: http://localhost:5000)*
