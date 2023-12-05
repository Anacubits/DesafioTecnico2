# API de Autenticação com Node.js e Express

Esta é uma aplicação de exemplo que demonstra a criação de uma API RESTful para autenticação de usuários usando Node.js, Express, JWT e bcrypt.

## Como Rodar

Certifique-se de ter o Node.js instalado na sua máquina.

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio


Instale as Dependências:

bash

npm install
Execute a Aplicação:


npm start
A aplicação será iniciada na porta 3000. Você pode acessar http://localhost:3000 no seu navegador.

Endpoints
Sign Up (Cadastro):

POST /signup
Sign In (Autenticação):

POST /signin
Buscar Usuário:

GET /user
Certifique-se de incluir o cabeçalho Authorization: Bearer {token} para autenticar a requisição.