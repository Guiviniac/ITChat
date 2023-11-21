const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { MongoClient } = require('../../../server/db');

const url = 'mongodb://localhost:27017/Itchat';

// Função para criar um hash da senha
async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Função para comparar a senha fornecida com o hash armazenado
async function comparePassword(inputPassword, hashedPassword) {
  return bcrypt.compare(inputPassword, hashedPassword);
}

// Função para inicializar o Passport
function initializePassport(passport) {
  passport.use(new LocalStrategy(async (username, password, done) => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db();
      const user = await db.collection('users').findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Nome de usuário incorreto.' });
      }

      const passwordMatch = await comparePassword(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Senha incorreta.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    } finally {
      await client.close();
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db();
      const user = await db.collection('users').findOne({ _id: id });
      done(null, user);
    } catch (err) {
      done(err, null);
    } finally {
      await client.close();
    }
  });
}

module.exports = {
  hashPassword,
  comparePassword,
  initializePassport,
};
