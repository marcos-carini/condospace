const usuarioService = require('../services/usuarioService');

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.status(200).json(usuarios); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cadastrarUsuario = async (req, res) => {
  const { nome, email, cpf, senha, telefone, bloco, apartamento } = req.body;
  try {
    await usuarioService.cadastrarUsuario({ nome, email, cpf, senha, telefone, bloco, apartamento });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  listarUsuarios,
  cadastrarUsuario,
};
