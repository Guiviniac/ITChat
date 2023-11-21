// server/app.js

const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const { initializePassport } = require('../src/public/javascript/auth');
const { connectToDatabase } = require('./db');
const indexRouter = require('../src/routes/index');
const dashboardRouter = require('../src/routes/dashboard');

// Configuração de sessão
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}));

// Inicializa o Passport
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Conecta ao banco de dados
connectToDatabase();

// Configuração das rotas
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);

// ... (outras configurações)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
