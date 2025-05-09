const express = require('express');
const app = express();
const usuarioController = require('./controllers/usuarioController');


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Backend do sistema de condomínio rodando!');
});

app.get('/usuarios', usuarioController.listarUsuarios);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
