const usuarioService = require('../services/usuarioService');

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.status(200).json(usuarios); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listarUsuarios,
};
