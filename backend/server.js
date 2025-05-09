const express = require('express');
const app = express();
const usuarioController = require('./controllers/usuarioController');
const espacoController = require('./controllers/espacoController');
const reservaController = require('./controllers/reservaController');


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Backend do sistema de condomínio rodando!');
});

// Rotas de Usuários
app.get('/usuarios', usuarioController.listarUsuarios);

// Rota de Espacos
app.get('/espacos', espacoController.listarEspacos);

// Rota de Reservas
app.get('/reservas', reservaController.listarReservas);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
