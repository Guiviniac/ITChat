const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/Itchat'; // Verifique a URL do seu banco de dados
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let database;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Conectado ao banco de dados');
    database = client.db();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

function getDatabase() {
  return database;
}

module.exports = {
  connectToDatabase,
  getDatabase,
};
