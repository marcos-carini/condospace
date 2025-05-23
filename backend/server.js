const express = require('express');
const app = express();
const cors = require('cors');
const authController = require('./controllers/authController');
const usuarioController = require('./controllers/usuarioController');
const espacoController = require('./controllers/espacoController');
const reservaController = require('./controllers/reservaController');


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Backend do sistema de condomínio rodando!');
});

app.post('/login', authController.login);

// Rotas de Usuários
app.get('/usuarios', usuarioController.listarUsuarios);
app.post('/usuarios', usuarioController.cadastrarUsuario);

// Rota de Espacos
app.get('/espacos', espacoController.listarEspacos);

// Rota de Reservas
app.get('/reservas', reservaController.listarReservas);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
