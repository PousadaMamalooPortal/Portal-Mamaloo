# 🌐 Portal Mamaloo - Fullstack Application

Este repositório contém uma aplicação full-stack da pousada **Mamaloo**, combinando tecnologias modernas no backend e frontend para fornecer uma interface eficiente e escalável.

O projeto utiliza:

- **FastAPI** (Python) no backend  
- **React.js + Vite** no frontend  
- **PostgreSQL** como banco de dados  
- **Docker** para isolamento de ambientes  
- **GitHub Actions** para deploy automático

---

## ✅ Tecnologias Utilizadas

- **Backend:** FastAPI (Python)  
- **Frontend:** React.js com Vite  
- **Banco de Dados:** PostgreSQL  
- **Docker:** Gerenciamento de containers e ambiente isolado  
- **CI/CD:** GitHub Actions para automação de testes, build e deploy  

---

## 🗂️ Estrutura do Projeto

```
PORTAL-MAMALOO/
│
├── backend/                        # Código do backend em FastAPI
├── frontend/                       # Código do frontend em React + Vite
├── .github/                        # Configurações de CI/CD com GitHub Actions
│   └── workflows/
│       └── ci-cd.yml               # Pipeline de deploy automático
├── .env                            # Variáveis de ambiente
├── .gitignore                      # Arquivos e pastas ignorados pelo Git
└── docker-compose.yml              # Orquestração dos containers (frontend, backend, banco)
```

### 📄 Descrição das Pastas e Arquivos

- `backend/`: Backend em **FastAPI** com rotas de API e lógica de negócio.  
- `frontend/`: Frontend com **React.js + Vite** para construção da interface.  
- `docker-compose.yml`: Orquestra os serviços da aplicação com **Docker**, incluindo redes, volumes e portas.  
- `.github/workflows/ci-cd.yml`: Define o pipeline de **CI/CD** automatizado com GitHub Actions.  
- `.env`: Contém **variáveis sensíveis** como senhas, URLs e credenciais dos containers.  
- `.gitignore`: Lista arquivos e pastas que **não devem ser versionados**.  

---

## ⚙️ Requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [Docker](https://www.docker.com/)  
- [Git](https://git-scm.com/)  
- [Python 3.9](https://www.python.org/downloads/release/python-390/)  
- [Node.js 16.x](https://nodejs.org/en)  

---

## 🚀 Como Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/PousadaMamalooPortal/Portal-Mamaloo
```

### 2. Construir e Executar os Containers

```bash
docker-compose up -d --build
```

#### O que esse comando faz

- Constrói e inicia os containers definidos no `docker-compose.yml`  
- Executa em segundo plano (`-d`)  
- Força a reconstrução das imagens (`--build`)  
- Orquestra o backend, frontend e banco de dados  

---

### 3. Links de Acesso

- **Frontend:** [http://localhost:5173](http://localhost:5173)  
- **Backend:** [http://localhost:8000](http://localhost:8000)  
- **Banco de Dados:** disponível na porta `5432`  
  - Use ferramentas como **pgAdmin** ou **DBeaver** para se conectar




