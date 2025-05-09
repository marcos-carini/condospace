const express = require('express');
require('dotenv').config();
const db = require('./db/connection');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Backend do sistema de condomínio rodando!');
});

app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuario', (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err.message);
      return res.status(500).json({ erro: 'Erro interno no servidor' });
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
