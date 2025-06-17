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
app.get('/usuarios/:id', usuarioController.buscarUsuarioPorId);
app.post('/usuarios', usuarioController.cadastrarUsuario);
app.put('/usuarios/:id/senha', usuarioController.atualizarSenha);
app.post('/usuarios/visitantes/:id', usuarioController.adicionarVisitante);
app.delete('/usuarios/visitantes/:id', usuarioController.removerVisitante);

// Rota de Espacos
app.get('/espacos', espacoController.listarEspacos);


// Rota de Reservas
app.get('/reservas', reservaController.listarReservas);
app.get('/reservas/usuario/:id', reservaController.listarReservasDoUsuario);
app.post('/reservas', reservaController.adicionarReserva);
app.put('/reserva/:id/cancelar', reservaController.cancelarReserva);




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
