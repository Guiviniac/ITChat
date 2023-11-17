const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { passport, isAuthenticated } = require('./auth'); // Importe o módulo de autenticação

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/itChat', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
mongoose.connection.once('open', () => {
  console.log('Conectado ao MongoDB');
});

app.use(bodyParser.json());

// Configurar o Passport
app.use(passport.initialize());
app.use(passport.session());

// Rota protegida
app.get('/', isAuthenticated, (req, res) => {
  res.send('Página principal');
});

// ... outras rotas

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
