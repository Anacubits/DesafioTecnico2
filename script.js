const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Simulando um banco de dados
const users = [];

app.use(express.json());

// Endpoint para criar um novo usuário
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  // Verifica se o email já está cadastrado
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ mensagem: 'E-mail já existente' });
  }

  // Cria um novo usuário
  const newUser = { email, password: bcrypt.hashSync(password, 10) };
  users.push(newUser);

  return res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
});

// Endpoint para autenticação
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Procura o usuário pelo email
  const user = users.find(u => u.email === email);

  // Verifica se o usuário existe e se a senha está correta
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
  }

  // Gera um token JWT
  const token = jwt.sign({ email }, 'secreto', { expiresIn: '30m' });

  return res.json({ token });
});

// Endpoint para buscar usuário autenticado
app.get('/user', (req, res) => {
  const token = req.headers.authorization;

  // Verifica se o token está presente
  if (!token) {
    return res.status(401).json({ mensagem: 'Não autorizado' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token.split(' ')[1], 'secreto');
    const user = users.find(u => u.email === decoded.email);

    if (!user) {
      throw new Error();
    }

    return res.json({ email: user.email });
  } catch (error) {
    return res.status(401).json({ mensagem: 'Sessão inválida' });
  }
});

// Endpoint para lidar com rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ mensagem: 'Endpoint não encontrado' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
