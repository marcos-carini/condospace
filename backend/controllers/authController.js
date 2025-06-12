const usuarioRepository = require('../repositories/usuarioRepository');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuarios = await usuarioRepository.buscarPorEmail(email);
    const usuario = usuarios[0];

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, nome: usuario.nome, id: usuario.id_usuario });

  } catch (error) {
    res.status(500).json({ message: 'Erro no login' });
  }
};

module.exports = { login };
